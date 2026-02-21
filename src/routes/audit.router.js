// libs
import { Router } from "express";

// controllers
import auditListController from "../controllers/audit/auditList.controller.js";

// middlewares
import roleAccessMiddleware from "../middlewares/roleAccess.middleware.js";

// constants
import { ROLES } from "../constants/userRoles.js";

const router = Router();

router.post("/list", roleAccessMiddleware([ROLES.ADMIN]), auditListController);

export default router;
