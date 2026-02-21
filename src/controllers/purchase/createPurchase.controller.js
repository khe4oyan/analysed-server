// service
import createPurchaseService from '../../services/purchase/createPurchase.service.js'

export default async function createPurchase(req, res) {
  const { title, amount } = req.body;
  const { id } = req.userData;

  const purchaseData = await createPurchaseService(title, amount, id);

  res.status(200).json({ success: true, purchaseData });
}