// libs
import { body, param } from "express-validator";

const purchaseIdValidator = [param("id").isInt({ min: 0 })];
const purchaseProperties =  [
  body("title")
    .notEmpty().withMessage("title must not be empty")
    .isString().withMessage("title must be a string")
    .isLength({ max: 50 }).withMessage("title max length is 50 characters"),
  body("amount")
    .notEmpty().withMessage("amount is required")
    .isInt({ min: 1 }).withMessage("amount must be an integer greater than or equal to 1")
];

export const createValidator = purchaseProperties;
export const editValidator = [...purchaseProperties, ...purchaseIdValidator];
export const submitValidator = purchaseIdValidator;
export const approvedValidator = purchaseIdValidator;
export const rejectedValidator = purchaseIdValidator;
export const deleteValidator = purchaseIdValidator;