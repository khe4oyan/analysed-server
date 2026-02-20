// utils
import AppError from "./AppError.class.js";

export default async function roleBaseFunction(handlersByRole, userRole) {
  const roleHandler = handlersByRole[userRole];
  
  if (!roleHandler) {
    throw new AppError("Forbidden", 403);
  }

  return await roleHandler();
}