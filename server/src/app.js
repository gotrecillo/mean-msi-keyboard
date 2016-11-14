import express from 'express';
import bodyParser from 'body-parser';

// init app
const app = express();

// add body parsing
app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // parsing application/x-www-form-urlencoded

// test method
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// catch all unhandler errors
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send(err);
});

export default app;
