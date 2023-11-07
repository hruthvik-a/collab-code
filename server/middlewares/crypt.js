import { scryptSync } from "crypto";

//salt to identify hash and decrypt password
const salt = "cfa705f59e33757bffb34778f0f29d9a";

//encrypt password
export function encrypt(value) {
  const getHash = (password) => scryptSync(password, salt, 32).toString("hex");
  return getHash(value);
}

//decrypt stored encrypted password
export function decrypt(value) {
  const getHash = (password) => scryptSync(password, salt, 32).toString("hex");
  return getHash(value);
}

//to verify the encrypted passowrd
export function verify(encryptedValue, providedValue) {
  const storedHash = encryptedValue;
  const inputHash = scryptSync(providedValue, salt, 32).toString("hex");
  return storedHash === inputHash;
}
