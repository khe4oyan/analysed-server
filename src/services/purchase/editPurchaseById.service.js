// repository
import PurchaseRepo from "../../repositories/purchase/Purchase.repo.js";

// utils
import AppError from "../../utils/AppError.class.js";

export default async function editPurchaseById(id, title, amount) {
  const isEdited = await PurchaseRepo.updateById(id, title,  amount);

  if (isEdited === false) {
    throw new AppError("Purchase is not edited", 500);
  }
}