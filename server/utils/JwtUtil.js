const jwt = require('jsonwebtoken');
const MyConstants = require('./MyConstants');
const JwtUtil = {
  genToken(username, password) {                          //genToken is a function create token 
    const token = jwt.sign(
      { username: username, password: password },
      MyConstants.JWT_SECRET,
      { expiresIn: MyConstants.JWT_EXPIRES }
    );
    return token;
  },
//JwtUtil.checkToken(req, res, next) function is middleware for checking the validity of a JWT in incoming HTTP requests. 
//It looks for the JWT in the request headers with keys 'x-access-token' and 'authorization'. If a token is found, it verifies it using.
//Use postman to check token is valid?
  checkToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
      jwt.verify(token, MyConstants.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  }
};
module.exports = JwtUtil;