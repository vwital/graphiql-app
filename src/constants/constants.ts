export const regExpUsername = new RegExp(/^[A-Z][a-zA-Z]*$/);
export const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/);
export const regExpPassword = new RegExp(
  /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d)(?=.*\p{P}).{8,}$/u
);

// Milliseconds to subtract from token expiration time (60 minutes)
export const TOKEN_EXPIRATION_SUBTRACT = 3000000;
