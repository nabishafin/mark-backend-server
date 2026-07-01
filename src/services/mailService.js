const nodemailer = require('nodemailer');
const { config, validateMailConfig } = require('../config/env');

let transporter;

// Lazily create a single reusable transporter.
function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: {
      user: config.mail.user,
      pass: config.mail.pass,
    },
  });

  return transporter;
}

/**
 * Send a contact message from a user to the admin inbox.
 * @param {{ name: string, email: string, subject?: string, message: string }} payload
 * @returns {Promise<{ messageId: string }>}
 */
async function sendContactEmail({ name, email, subject, message }) {
  const missing = validateMailConfig();
  if (missing.length) {
    const err = new Error(`Mail is not configured. Missing: ${missing.join(', ')}`);
    err.statusCode = 503;
    throw err;
  }

  const mailSubject = subject
    ? `[Contact] ${subject}`
    : `[Contact] New message from ${name}`;

  const info = await getTransporter().sendMail({
    from: `"${config.mail.fromName}" <${config.mail.user}>`,
    to: config.mail.adminEmail,
    replyTo: `"${name}" <${email}>`, // admin can reply straight to the user
    subject: mailSubject,
    text: `New message from ${name} (${email})\n\n${message}`,
    html: `
      <h2>New contact message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  });

  return { messageId: info.messageId };
}

// Verify SMTP connection at startup (optional, non-fatal).
async function verifyConnection() {
  const missing = validateMailConfig();
  if (missing.length) return false;
  await getTransporter().verify();
  return true;
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = { sendContactEmail, verifyConnection };
