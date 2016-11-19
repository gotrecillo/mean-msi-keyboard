// npm packages
import test from 'tape';

// our packages
import { thinky } from '../src/db';

// tests
import core from './core';
import register from './register';
import login from './login';
import user from './user';
import keyboardModesValidations from './keyboardModesValidations';
import keyboardModes from './keyboardModes';

export default (reqlite) => {
  thinky.dbReady().then(() => {
    // execute tests
    core(test);
    register(test);
    login(test);
    user(test);
    keyboardModesValidations(test);
    keyboardModes(test);

    // close db connections
    test((t) => {
      setImmediate(() => thinky.r.getPoolMaster().drain());
      reqlite.stop();
      t.end();
    });
  });
}
