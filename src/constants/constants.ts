export const regExpUsername = new RegExp(/^[A-Z][a-zA-Z]*$/);
export const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/);
export const regExpPassword = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/
);

// expiration time in milliseconds
export const TOKEN_EXPIRATION = 600000;
