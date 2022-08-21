const crypto = require("crypto");
const config = require('../../config')
class AESCipher {
    constructor(key) {
        const hash = crypto.createHash('sha256');
        hash.update(key);
        this.key = hash.digest();
    }

    decrypt(encrypt) {
        const encryptBuffer = Buffer.from(encrypt, 'base64');
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, encryptBuffer.slice(0, 16));
        let decrypted = decipher.update(encryptBuffer.slice(16).toString('hex'), 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

aesCiper = new AESCipher(config.feishu.encryptKey)
module.exports = aesCiper
