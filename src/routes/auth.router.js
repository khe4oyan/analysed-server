// libs
import { Router } from "express";

// controllers
import registerController from "../controllers/auth/register.controller.js";
import loginController from "../controllers/auth/login.controller.js";
import logoutController from "../controllers/auth/logout.listener.js";

// middlewares
import validationResultMiddleware from "../middlewares/validationResult.middleware.js";
import tokenAuthenticateMiddleware from "../middlewares/tokenAuthenticate.middleware.js";

// validators
import * as authValidator from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/register",
  authValidator.registerValidator,
  validationResultMiddleware,
  registerController,
);

router.post(
  "/login",
  authValidator.loginValidator,
  validationResultMiddleware,
  loginController,
);

router.post(
  "/logout", 
  tokenAuthenticateMiddleware, 
  logoutController,
);

export default router;
