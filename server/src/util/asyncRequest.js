import logger from './logger';

export const asyncRequest = handler =>
  (req, res) =>
    handler(req, res).catch((e) => {
      logger.error('error during request: ', e);
      res.status(400).send({ error: e.toString() });
    });
