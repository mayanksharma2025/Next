// middlewares.js
module.exports = (req, res, next) => {
  // Expose the X-Total-Count header so Node fetch can read it
  res.header('Access-Control-Expose-Headers', 'X-Total-Count')
  next()
}
