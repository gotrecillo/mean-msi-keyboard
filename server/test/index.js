// usage of process.env is a workaroud for issues with setting env vars in windows
process.env.NODE_ENV = 'testing';

// require babel requiere hook
require('babel-core/register');

// create reqlite instance
const ReqliteServer = require('reqlite');
const server = new ReqliteServer({ silent: true });

// require and start main tests
const startTests = require('./main.js').default;
startTests(server);
