const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const verifyToken = (req, res, next) => {
  console.log('hello');

  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin === true) {
      next();
    } else {
      return next(createError(403, "YOu are not autorized"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  console.log('hello');
  
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
