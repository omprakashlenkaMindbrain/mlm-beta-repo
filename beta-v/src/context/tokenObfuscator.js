import CryptoJS from "crypto-js";

const SECRET_KEY = "BMPL_SUPER_SECRET_2025"; // keep this constant

// Add random garbage
const addNoise = (str) => {
  const noise1 = CryptoJS.lib.WordArray.random(8).toString();
  const noise2 = CryptoJS.lib.WordArray.random(8).toString();
  return `${noise1}::${str}::${noise2}`;
};

// Remove garbage
const removeNoise = (str) => {
  try {
    return str.split("::")[1];
  } catch {
    return null;
  }
};

// Encrypt + mix
export const hideToken = (token) => {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  const withNoise = addNoise(encrypted);
  return btoa(withNoise);
};

// Decode + decrypt
export const revealToken = (hidden) => {
  try {
    const decoded = atob(hidden);
    const cleaned = removeNoise(decoded);
    return CryptoJS.AES.decrypt(cleaned, SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    );
  } catch {
    return null;
  }
};
