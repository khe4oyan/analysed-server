// libs
import { validationResult as validationResultLib } from "express-validator";

export default async function validationResult(req, res, next) {
  const errors = validationResultLib(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array()[0].msg });
  } else {
    next();
  }
}