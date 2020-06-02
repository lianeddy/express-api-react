const Crypto = require("crypto");

function encrypt(password) {
  return Crypto.createHmac("sha256", "kuncirahasia")
    .update(password)
    .digest("hex");
}

module.exports = encrypt;
