var appRoot = require('app-root-path');
var winston = require('winston');


var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 50,
    colorize: false,
  },
};

// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
