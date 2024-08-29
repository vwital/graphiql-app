import * as yup from "yup";
import {
  regExpEmail,
  regExpPassword,
  regExpUsername,
} from "../../constants/constants";

export const schemaReg = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Name is required")
    .matches(regExpUsername, "Name should start with an uppercase letter"),
  email: yup
    .string()
    .required("Email is required")
    .matches(regExpEmail, "Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      regExpPassword,
      "Password strength requirements: minimum 8 symbols, at least one letter, one digit, one special character"
    ),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(regExpEmail, "Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      regExpPassword,
      "Password strength requirements: minimum 8 symbols, at least one letter, one digit, one special character"
    ),
});
