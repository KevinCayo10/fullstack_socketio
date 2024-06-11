const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const getToken = (username) => {
  const token = jwt.sign({ username }, secret, {
    expiresIn: "1h",
  });
  return token;
};

const validateToken = (token) => {
  const splitToken = token.split(" ")[1];
  if (!token) {
    return null;
  }
  try {
    const payload = jwt.verify(splitToken, secret);
    return payload;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getToken,
  validateToken,
};
