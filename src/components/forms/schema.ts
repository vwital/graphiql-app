import * as yup from "yup";
import {
  regExpEmail,
  regExpPassword,
  regExpUsername,
} from "../../constants/constants";

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required("emailRequired")
    .matches(regExpEmail, "emailInvalid"),
  password: yup
    .string()
    .required("passwordRequired")
    .matches(regExpPassword, "passwordInvalid"),
});

export const schemaReg = schemaLogin.shape({
  username: yup
    .string()
    .trim()
    .required("usernameRequired")
    .matches(regExpUsername, "usernameInvalid"),
});
