import CryptoJS from "crypto-js";

const SECRET_KEY = "tda24-frontend-secret-key-12sdhfhsduifhigheugvuehodsaiposfhiuysfgywfyuwefyiwe";

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (ciphertext) => {
    if (!ciphertext) return null;
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch {
        return null;
    }
};
