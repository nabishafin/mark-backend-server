const asyncHandler = require('../utils/asyncHandler');
const { sendContactEmail } = require('../services/mailService');

// POST /api/contact
// User submits a message; we email the admin and return quick feedback.
const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  const { messageId } = await sendContactEmail({ name, email, subject, message });

  res.status(200).json({
    success: true,
    message: 'তোমার মেসেজ পাঠানো হয়েছে ✅ / Your message has been sent successfully.',
    messageId,
  });
});

module.exports = { sendMessage };
