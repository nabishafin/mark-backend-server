const { config } = require('../config/env');

// Central error handler. Any next(err) or thrown async error lands here.
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(config.nodeEnv === 'development' && status >= 500
      ? { stack: err.stack }
      : {}),
  });
};
