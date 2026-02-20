// libs
import { Router } from "express";

// controllers
import purchasesController from "../controllers/purchase/purchases.controller.js";
import createPurchaseController from "../controllers/purchase/createPurchase.controller.js";
import submtiPurchaseController from "../controllers/purchase/submitPurchase.controller.js";
import approvedPurchaseController from "../controllers/purchase/approvedPurchase.controller.js";
import rejectedPurchaseController from "../controllers/purchase/rejectedPurchase.controller.js";
import deletePurchaseController from "../controllers/purchase/deletePurchase.controller.js";

// middlewares
import roleAccessMiddleware from "../middlewares/roleAccess.middleware.js";
import validationResultMiddleware from "../middlewares/validationResult.middleware.js";

// constants
import { ROLES } from "../constants/userRoles.js";

const router = Router();

router.get(
  "/list",
  roleAccessMiddleware([ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF]),
  purchasesController,
);
router.post(
  "/create",
  roleAccessMiddleware([ROLES.STAFF]),
  validationResultMiddleware,
  createPurchaseController,
);
router.patch(
  "/submit/:id",
  roleAccessMiddleware([ROLES.STAFF]),
  validationResultMiddleware,
  submtiPurchaseController,
);
router.patch(
  "/approved/:id",
  roleAccessMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  validationResultMiddleware,
  approvedPurchaseController,
);
router.patch(
  "/rejected/:id",
  roleAccessMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  validationResultMiddleware,
  rejectedPurchaseController,
);
router.delete(
  "/delete/:id",
  roleAccessMiddleware([ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF]),
  validationResultMiddleware,
  deletePurchaseController,
);

export default router;
