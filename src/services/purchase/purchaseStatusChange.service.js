// repository
import PurchaseRepo from "../../repositories/purchase/Purchase.repo.js";
import AppError from "../../utils/AppError.class.js";

export default async function purchaseStatusChange(purchaseId, status) {
  const isChanged = await PurchaseRepo.updateStatus(purchaseId, status);

  if (isChanged === false) {
    throw new AppError("Status is not updated", 500);
  }
}