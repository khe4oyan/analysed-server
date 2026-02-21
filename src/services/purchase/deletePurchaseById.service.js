// sersvices
import createAuditService from '../../services/audit/createAudit.service.js';

// repository
import PurchaseRepo from "../../repositories/purchase/Purchase.repo.js";

// utils
import roleBaseFunction from "../../utils/roleBaseFunction.js";
import AppError from "../../utils/AppError.class.js";

// constants
import { ROLES } from "../../constants/userRoles.js";
import { PURCHASE_STATUSES } from '../../constants/purchaseStatusTypes.js'

export default async function deletePurchaseById(purchaseId, userData) {
  const purchaseData = await PurchaseRepo.purchaseById(purchaseId);
  if (!purchaseData) {
    throw new AppError("Purchase not found", 404);
  }
  
  await roleBaseFunction({
    async [ROLES.ADMIN]() {
      await PurchaseRepo.deleteById(purchaseId);
    },
    
    async [ROLES.MANAGER]() {
      if (purchaseData?.status === PURCHASE_STATUSES.DRAFT) {
        throw new AppError("Purchase not found", 404);
      }

      await PurchaseRepo.deleteById(purchaseId);
    },

    async [ROLES.STAFF]() {
      if (purchaseData.created_by_id !== userData.id) {
        throw new AppError("You cant delete other puchases", 403);
      }

      await PurchaseRepo.deleteById(purchaseId);
    },
  }, userData.role);

  await createAuditService(userData.id, `Deleted purchase: ${purchaseData.title}`);
}