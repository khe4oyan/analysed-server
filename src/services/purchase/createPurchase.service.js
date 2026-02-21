// repository
import PurchaseRepo from "../../repositories/purchase/Purchase.repo.js";

export default async function createPurchase(title, amount, userId) {
  const purchaseId = await PurchaseRepo.create(title, amount, userId);
  const purchaseData = await PurchaseRepo.purchaseById(purchaseId);

  return purchaseData;
}