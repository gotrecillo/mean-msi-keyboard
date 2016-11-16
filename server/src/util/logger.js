import winston from 'winston';

const getLogLevel = (env) => {
  switch (env) {
    case 'production':
      return 'info';
    case 'testing':
      return 'error';
    default:
      return 'debug';
  }
};

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: getLogLevel(process.env.NODE_ENV),
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      label: 'msi-keyboard-server',
    }),
  ],
});

logger.stream = {
  write: message => logger.info(message),
};

export default logger;
