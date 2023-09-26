// This function calculates the MD5 hash of the input data using the Node.js crypto module and returns the hash as a hexadecimal string.
const CryptoUtil = {
    md5(input) {
      const crypto = require('crypto');
      const hash = crypto.createHash('md5').update(input).digest('hex');
      return hash;
    }
  };
  module.exports = CryptoUtil;