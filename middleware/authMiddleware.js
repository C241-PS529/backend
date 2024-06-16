const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// Contoh fungsi untuk menghasilkan token JWT
function generateAccessToken(user) {
  return jwt.sign(user, accessTokenSecret, { expiresIn: '1h' });
}

// Contoh middleware untuk memverifikasi token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
