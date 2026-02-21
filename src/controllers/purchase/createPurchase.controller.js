// service
import createPurchaseService from '../../services/purchase/createPurchase.service.js'
import createAuditService from '../../services/audit/createAudit.service.js';

export default async function createPurchase(req, res) {
  const { title, amount } = req.body;
  const { id } = req.userData;

  const purchaseData = await createPurchaseService(title, amount, id);

  await createAuditService(id, `Created purchase`);

  res.status(200).json({ success: true, purchaseData });
}