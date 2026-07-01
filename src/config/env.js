require('dotenv').config();

// Centralised, validated environment config.
// Add new env variables here so the rest of the app never reads process.env directly.
const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  mail: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    // Where user messages are delivered (the admin inbox)
    adminEmail: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    // Friendly "from" name shown to the admin
    fromName: process.env.MAIL_FROM_NAME || 'Mark Backend',
  },
};

// Warn early if mail is not configured, instead of failing silently at send time.
function validateMailConfig() {
  const missing = [];
  if (!config.mail.host) missing.push('SMTP_HOST');
  if (!config.mail.user) missing.push('SMTP_USER');
  if (!config.mail.pass) missing.push('SMTP_PASS');
  if (!config.mail.adminEmail) missing.push('ADMIN_EMAIL');
  return missing;
}

module.exports = { config, validateMailConfig };
