import crypto from "crypto";

export function verifyPassword(password, hash, salt) {
  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === hashToVerify;
}
