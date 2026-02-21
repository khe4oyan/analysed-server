// libs
import { Router } from "express";

// controllers
import auditListController from "../controllers/audit/auditList.controller.js";

const router = Router();

router.post("/list", auditListController);

export default router;
