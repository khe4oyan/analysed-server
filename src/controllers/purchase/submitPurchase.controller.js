// services
import getPurchaseByIdService from '../../services/purchase/getPurchaseById.service.js';
import purchaseStatusChangeService from '../../services/purchase/purchaseStatusChange.service.js';
import createAuditService from '../../services/audit/createAudit.service.js';

// utils
import AppError from  '../../utils/AppError.class.js';

// constants
import { PURCHASE_STATUSES } from '../../constants/purchaseStatusTypes.js';

export default async function createPurchase(req, res) {
  // get purchase
  const purchaseId = +req.params.id;
  const purchaseData = await getPurchaseByIdService(purchaseId);

  // check purchase status
  if (purchaseData.status !== PURCHASE_STATUSES.DRAFT) {
    throw new AppError("Only draft purchases can be submitted", 400);
  }
  
  // check created_by_id
  const userData = req.userData;
  const isUserNotCreatedPurchase = purchaseData.created_by_id !== userData.id;
  if (isUserNotCreatedPurchase) {
    throw new AppError("You do not have permission to submit this purchase", 403);
  }

  // set status to submit
  await purchaseStatusChangeService(purchaseId, PURCHASE_STATUSES.SUBMITTED, userData.id);

  await createAuditService(userData.id, `Submitted purchase: ${purchaseData.title}`);

  res.status(200).json({ success: true });
}