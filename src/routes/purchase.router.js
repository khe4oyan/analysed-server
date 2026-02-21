// libs
import { Router } from "express";

// controllers
import purchasesController from "../controllers/purchase/purchases.controller.js";
import createPurchaseController from "../controllers/purchase/createPurchase.controller.js";
import editPurchaseController from '../controllers/purchase/editPurchase.controller.js';
import submtiPurchaseController from "../controllers/purchase/submitPurchase.controller.js";
import approvedPurchaseController from "../controllers/purchase/approvedPurchase.controller.js";
import rejectedPurchaseController from "../controllers/purchase/rejectedPurchase.controller.js";
import deletePurchaseController from "../controllers/purchase/deletePurchase.controller.js";

// middlewares
import roleAccessMiddleware from "../middlewares/roleAccess.middleware.js";
import validationResultMiddleware from "../middlewares/validationResult.middleware.js";

// validators
import * as purchaseValidator from '../validators/purchases.validator.js';

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
  purchaseValidator.createValidator,
  validationResultMiddleware,
  createPurchaseController,
);

router.put(
  "/edit/:id",
  roleAccessMiddleware([ROLES.STAFF]),
  purchaseValidator.editValidator,
  validationResultMiddleware,
  editPurchaseController,
);

router.patch(
  "/submit/:id",
  roleAccessMiddleware([ROLES.STAFF]),
  purchaseValidator.submitValidator,
  validationResultMiddleware,
  submtiPurchaseController,
);

router.patch(
  "/approved/:id",
  roleAccessMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  purchaseValidator.approvedValidator,
  validationResultMiddleware,
  approvedPurchaseController,
);

router.patch(
  "/rejected/:id",
  roleAccessMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  purchaseValidator.rejectedValidator,
  validationResultMiddleware,
  rejectedPurchaseController,
);

router.delete(
  "/delete/:id",
  roleAccessMiddleware([ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF]),
  purchaseValidator.deleteValidator,
  validationResultMiddleware,
  deletePurchaseController,
);

export default router;
