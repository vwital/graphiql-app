export const regExpUsername = new RegExp(/^[\p{Lu}][\p{L}]*$/u);

export const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/);
export const regExpPassword = new RegExp(
  /^(?=.*\p{L})(?=.*\d)(?=.*[\p{P}\p{S}<>=^$+]).{8,}$/u
);

// Milliseconds to subtract from token expiration time (60 minutes)
export const TOKEN_EXPIRATION_SUBTRACT = 3000000;

export const SESSION_COOKIE_NAME = "user_session";
export const SESSION_COOKIE_DISPLAY_NAME = "user_name";
