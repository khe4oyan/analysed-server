// libs
import { body } from "express-validator";

const emailPassValidator = [
  body("email")
    .notEmpty()
      .withMessage("Email is empty")
      .bail()
    .isEmail()
      .withMessage("Invalid email"),
  body("password")
    .notEmpty()
      .withMessage("Password is empty")
      .bail()
    .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters long")
      .bail()
    .matches(/\d/)
      .withMessage("Password must contain at least one number"),
];

export const loginValidator = [...emailPassValidator];

export const registerValidator = [
  ...emailPassValidator,
  body("full_name")
    .notEmpty()
    .withMessage("Full name is empty")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Full name lenght must be between 3 and 30 characters long"),
];
