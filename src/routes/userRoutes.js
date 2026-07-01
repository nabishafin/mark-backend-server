const express = require('express');
const { body } = require('express-validator');

const validate = require('../middleware/validate');
const { getUsers, getUser, createUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post(
  '/',
  [body('name').trim().notEmpty().withMessage('name is required')],
  validate,
  createUser
);

module.exports = router;
