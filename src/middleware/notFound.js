// Catches any request that didn't match a route.
module.exports = (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
};
