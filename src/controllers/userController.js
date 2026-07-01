const asyncHandler = require('../utils/asyncHandler');

// Demo in-memory store — swap for a database later.
let users = [{ id: 1, name: 'Shafin' }];

const getUsers = asyncHandler(async (req, res) => {
  res.json({ success: true, data: users });
});

const getUser = asyncHandler(async (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({ success: true, data: user });
});

const createUser = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

module.exports = { getUsers, getUser, createUser };
