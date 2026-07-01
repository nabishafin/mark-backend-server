const app = require('./app');
const { config } = require('./config/env');
const { verifyConnection } = require('./services/mailService');

const server = app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port} (${config.nodeEnv})`);

  // Non-fatal SMTP check so you know early if mail is misconfigured.
  verifyConnection()
    .then((ok) => {
      if (ok) console.log('✅ SMTP connection verified — email is ready.');
      else console.warn('⚠️  Mail not configured. Set SMTP_* vars in .env to enable email.');
    })
    .catch((err) => console.warn('⚠️  SMTP verify failed:', err.message));
});

// Graceful shutdown
process.on('SIGINT', () => server.close(() => process.exit(0)));
process.on('SIGTERM', () => server.close(() => process.exit(0)));

module.exports = server;
