// npm packages
import test from 'tape';

// our packages
import { thinky } from '../src/db';

// tests
import core from './core';
import register from './register';

export default (reqlite) => {
  thinky.dbReady().then(() => {
    // execute tests
    core(test);
    register(test);


    // close db connections
    test((t) => {
      setImmediate(() => thinky.r.getPoolMaster().drain());
      reqlite.stop();
      t.end();
    });
  });
}
