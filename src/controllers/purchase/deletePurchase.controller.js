// services
import deletePurchaseByIdService from '../../services/purchase/deletePurchaseById.service.js';

export default async function deletePurchase(req, res) {
  const purchaseId = req.params.id;
  const userData = req.userData;

  await deletePurchaseByIdService(purchaseId, userData);

  res.status(200).json({ success: true });
}