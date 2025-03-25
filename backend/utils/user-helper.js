import {
  minUsernameLength,
  minPasswordLength,
  maxUsernameLength,
  maxPasswordLength,
} from "../data/auth.input.length.js";

export function getInvalidUserRequestMessage(req, fingerprintRequired) {
    const fingerprintExists = !!req.body.fingerprint;
    const username = !!req.body.username ? req.body.username : "";
    const password = !!req.body.password ? req.body.password : "";
    const usernameValid =
      username.length >= minUsernameLength &&
      username.length <= maxUsernameLength;
    const passwordValid =
      password.length >= minPasswordLength &&
      password.length <= maxPasswordLength;
    if (!fingerprintExists && fingerprintRequired) {
      return "You can register only using web form";
    } else if (!usernameValid) {
      return `Username must be between ${minUsernameLength} - ${maxUsernameLength} characters`;
    } else if (!passwordValid) {
      return `Password must be between ${minPasswordLength} - ${maxPasswordLength} characters`;
    }
  
    return null;
  }