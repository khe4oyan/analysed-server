// utils
import roleBaseFunction from '../../utils/roleBaseFunction.js';

// repository
import PurchaseRepo from '../../repositories/purchase/Purchase.repo.js'

// constants
import { ROLES } from "../../constants/userRoles.js";

export default async function purchaseList(userId, userRole) {
  const result = await roleBaseFunction({
    async [ROLES.ADMIN]() {
      return await PurchaseRepo.listForAdmin(userId);
    },
    
    async [ROLES.MANAGER]() {
      return await PurchaseRepo.listForManager(userId);
    },

    async [ROLES.STAFF] () {
      return await PurchaseRepo.listForStaff(userId);
    },
  }, userRole);

  return result;
}