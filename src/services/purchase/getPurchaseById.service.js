// repository
import PurchaseRepo from "../../repositories/purchase/Purchase.repo.js";

// utils
import AppError from "../../utils/AppError.class.js";

export default async function getPurchaseById(purchaseId) {
  const result = await PurchaseRepo.purchaseById(purchaseId);

  if (result) {
    return result;
  } 

  throw new AppError("Product not found", 404);
}