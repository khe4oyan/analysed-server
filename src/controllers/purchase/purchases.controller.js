// service
import purchaseListService from '../../services/purchase/purchaseList.service.js';

export default async function purchases(req, res) {
  const { id, role } = req.userData;

  const result = await purchaseListService(id, role);
 
  res.json({ success: true, purchases: result });
}