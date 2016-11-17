// npm packages
import request from 'supertest';

// our packages
import app from '../src/app';

export default (test) => {
  test('Should register user with given username and password', t => {
    request(app)
      .post('/api/register')
      .send({ username: 'foo', password: 'pass', passwordRepeat: 'pass' })
      .expect(201)
      .end(err => {
        t.error(err, 'No error');
        t.end();
      })
  });

  test('Should register another user with a different username', t => {
    request(app)
      .post('/api/register')
      .send({ username: 'bar', password: 'pass', passwordRepeat: 'pass'})
      .expect(201)
      .end(err => {
        t.error(err, 'No error');
        t.end();
      })
  });

  test('Should fail to register an user with the same username', t => {
    request(app)
      .post('/api/register')
      .send({ username: 'foo', password: 'pass', passwordRepeat: 'pass' })
      .expect(400)
      .end((err, res) => {
        const expectedBody = { error: 'Username already in use' };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve body');
        t.end();
      })
  });

  test('Should fail to register an user with mismatching passwords', t => {
    request(app)
      .post('/api/register')
      .send({ username: 'baz', password: 'pass', passwordRepeat: 'password'})
      .expect(400)
      .end((err, res) => {
        const expectedBody = { error: 'Passwords do not match!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve body');
        t.end();
      })
  });

  test('Should not check if the username is already in use with mismatching passwords', t => {
    request(app)
      .post('/api/register')
      .send({ username: 'foo', password: 'pass', passwordRepeat: 'password'})
      .expect(400)
      .end((err, res) => {
        const expectedBody = { error: 'Passwords do not match!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve body');
        t.end();
      })
  })

}
