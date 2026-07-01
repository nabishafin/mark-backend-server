const express = require('express');
const { body } = require('express-validator');

const validate = require('../middleware/validate');
const { sendMessage } = require('../controllers/contactController');

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('name is required'),
    body('email').trim().isEmail().withMessage('a valid email is required'),
    body('subject').optional().trim(),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('message is required')
      .isLength({ min: 3 })
      .withMessage('message is too short'),
  ],
  validate,
  sendMessage
);

module.exports = router;
