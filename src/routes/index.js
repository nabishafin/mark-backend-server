const express = require('express');

const router = express.Router();

// Mount feature routers here. Add new modules in one place.
router.use('/users', require('./userRoutes'));
router.use('/contact', require('./contactRoutes'));

module.exports = router;
