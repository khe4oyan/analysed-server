// utils
import AppError from "../utils/AppError.class.js";

// constants
import { ROLES } from "../constants/userRoles.js";

export default function roleAccess(roles = []) {
  return (req, _res, next) => {
    const userData = req.userData;

    if (!userData) {
      throw new AppError("No access", 501);
    }

    const isUserHasAccess = roles.includes(userData.role);

    if (isUserHasAccess) {
      return next();
    } else {
      throw new AppError("No access", 503);
    }
  };
}
