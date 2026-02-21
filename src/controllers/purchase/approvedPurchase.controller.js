// services
import getPurchaseByIdService from '../../services/purchase/getPurchaseById.service.js';
import purchaseStatusChangeService from '../../services/purchase/purchaseStatusChange.service.js';

// utils
import AppError from '../../utils/AppError.class.js';

// constants
import { PURCHASE_STATUSES } from '../../constants/purchaseStatusTypes.js';

export default async function approvedPurchase(req, res) {
  const purchaseId = +req.params.id;
  const purchaseData = await getPurchaseByIdService(purchaseId);

  // check purchase status
  if (purchaseData.status !== PURCHASE_STATUSES.SUBMITTED) {
    throw new AppError("Only submited purchases can be approved", 400);
  }

  await purchaseStatusChangeService(purchaseId, PURCHASE_STATUSES.APPROVED);

  res.status(200).json({ success: true });
}