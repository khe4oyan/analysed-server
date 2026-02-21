// services
import getPurchaseByIdService from '../../services/purchase/getPurchaseById.service.js';
import editPurchaseByIdService from '../../services/purchase/editPurchaseById.service.js';
import createAuditService from '../../services/audit/createAudit.service.js';

// utils
import AppError from '../../utils/AppError.class.js';

// constants
import { PURCHASE_STATUSES } from '../../constants/purchaseStatusTypes.js';

export default async function editPurchase(req, res) {
  // get purchase
  const purchaseId = +req.params.id;
  const purchaseData = await getPurchaseByIdService(purchaseId);

  // check purchase status
  if (purchaseData.status !== PURCHASE_STATUSES.DRAFT) {
    throw new AppError("You cant change it. Purchase is submitted/approved or rejected.", 403);
  }
  
  // check created_by_id
  const userData = req.userData;
  const isUserNotCreatedPurchase = purchaseData.created_by_id !== userData.id;
  if (isUserNotCreatedPurchase) {
    throw new AppError("You do not have permission to edit this purchase", 403);
  }
  
  // edit data
  const { title, amount } = req.body;
  await editPurchaseByIdService(purchaseId, title, amount);

  // logging
  await createAuditService(userData.id, `Edited purchase. Old: ${purchaseData.title} | New: ${title}`);

  // send status success
  res.status(200).json({ success: true });
}