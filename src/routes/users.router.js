// libs
import { Router } from "express";

// controllers
import getUserByIdController from "../controllers/users/getById.controller.js";

// middlewares
import roleAccessMiddleware from "../middlewares/roleAccess.middleware.js";
import validationResultMiddleware from "../middlewares/validationResult.middleware.js";

// validators
import * as usersValidator from "../validators/users.validator.js";

// constants
import { ROLES } from "../constants/userRoles.js";

const router = Router();

router.get(
  "/:id",
  roleAccessMiddleware([ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF]),
  usersValidator.getUserByIdValidator,
  validationResultMiddleware,
  getUserByIdController,
);

export default router;
