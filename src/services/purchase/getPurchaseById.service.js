// repository
import PurchaseRepo from "../../repositories/purchase/Purchase.repo.js";

// utils
import AppError from "../../utils/AppError.class.js";

export default async function getPurchaseById(purchaseId) {
  const result = await PurchaseRepo.purchaseById(purchaseId);

  if (result.length > 0) {
    return result[0];
  } 

  throw new AppError("Product not found", 404);
}