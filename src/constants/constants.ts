export const regExpUsername = new RegExp(/^[A-Z][a-zA-Z]*$/);
export const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/);
export const regExpPassword = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/
);

// Milliseconds to subtract from token expiration time (60 minutes)
export const TOKEN_EXPIRATION_SUBTRACT = 3000000;
