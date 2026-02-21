// libs
import { param } from "express-validator";

export const getUserByIdValidator = [
  param("id").isInt({ min: 0 }).withMessage("id must be number")
];