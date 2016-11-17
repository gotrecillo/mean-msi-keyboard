// npm packages
import request from 'supertest';
import jwt from 'jsonwebtoken';

// our packages
import app from '../src/app';
import { auth as authConfig } from '../config';

export default (test) => {
  test('Should login with existing username and password', t => {
    request(app)
      .post('/api/login')
      .send({ username: 'foo', password: 'pass' })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;
        const decodedUser = jwt.verify(actualBody.token, authConfig.jwtSecret);
        delete decodedUser.iat; // ignore jwt timestamps

        t.error(err, 'No error');
        t.ok(actualBody.user, 'User exists');
        t.ok(actualBody.token, 'Token exists');
        t.equal(actualBody.user.username, 'foo', 'Username matches request');
        t.deepEqual(actualBody.user, decodedUser, 'User must match token');

        // we set the token and the user for the next tests
        app.set('token', actualBody.token);
        app.set('user', actualBody.user);

        t.end();
      })
  });

  test('Should fail to login with wrong password', t => {
    request(app)
      .post('/api/login')
      .send({ username: 'foo', password: 'aaaa' })
      .expect(401)
      .end(err => {
        t.error(err, 'No error');
        t.end();
      })
  });

  test('Should fail to login with inexistent username', t => {
    request(app)
      .post('/api/login')
      .send({ username: 'idontexist', password: 'aaaa' })
      .expect(401)
      .end(err => {
        t.error(err, 'No error');
        t.end();
      })
  });
}
