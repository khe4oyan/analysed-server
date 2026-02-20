// repository
import PurchaseRepo from "../../repositories/purchase/Purchase.repo.js";

export default async function createPurchase(title, amount, userId) {
  const purchaseId = await PurchaseRepo.create(title, amount, userId);
  const purchaseDataArr = await PurchaseRepo.purchaseById(purchaseId);
  const purchaseData = purchaseDataArr[0];

  return purchaseData;
}