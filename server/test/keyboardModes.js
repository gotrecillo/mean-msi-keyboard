// npm packages
import request from 'supertest';

// our packages
import app from '../src/app';
import { defaultKeyboard } from '../src/validations';

export default (test) => {
  test('POST /api/keyboard-mode - should not create new keyboard mode without name', t => {
    const input = { name: undefined, colors: defaultKeyboard.colors, mode: defaultKeyboard.mode };

    request(app)
      .post('/api/keyboard-mode/')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = { error: 'Name should be present' };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/keyboard-mode - should not create new keyboard mode without mode', t => {
    const input = { name: defaultKeyboard.name, colors: defaultKeyboard.colors, mode: undefined };

    request(app)
      .post('/api/keyboard-mode/')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = { error: 'Mode not valid' };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/keyboard-mode - should not create new keyboard mode without colors', t => {
    const input = { name: defaultKeyboard.name, colors: undefined, mode: defaultKeyboard.mode };

    request(app)
      .post('/api/keyboard-mode/')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = { error: 'Colors not valid' };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/keyboard-mode - should not create new keyboard mode with an invalid mode', t => {
    const input = { name: defaultKeyboard.name, colors: defaultKeyboard.colors, mode: 'foo' };

    request(app)
      .post('/api/keyboard-mode/')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = { error: 'Mode not valid' };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/keyboard-mode - should not create new keyboard mode with an invalid colors object', t => {
    const input = { name: defaultKeyboard.name, colors: { foo: 'bar' }, mode: defaultKeyboard.mode };

    request(app)
      .post('/api/keyboard-mode/')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = { error: 'Colors not valid' };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/keyboard-mode - create new keyboard mode', t => {
    const input = defaultKeyboard;

    request(app)
      .post('/api/keyboard-mode/')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody.colors, input.colors, 'Retrieve same keyboard-mode colors');
        t.equal(actualBody.name, input.name, 'Retrieve same keyboard-mode name');
        t.equal(actualBody.mode, input.mode, 'Retrieve same keyboard-mode mode');
        t.equal(actualBody.creator, app.get('user').id, 'Retrieve keyboard-mode creator');
        t.end();
      });
  });
}
