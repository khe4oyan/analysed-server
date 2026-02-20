// repo
import AuthRepo from "../repositories/auth/Auth.repo.js";

// utils
import { parseToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.class.js";

export default async function tokenAuthenticate(req, _res, next) {
  // token check
  const token = tokenExtractFromBearer(req);
  if (!token) {
    throw new AppError("No token", 401);
  }

  // user data check: token parsing
  const userData = parseToken(token);
  if (!userData) {
    throw new AppError("Invalid token", 401);
  }

  // user data check: in db
  const dbUserdata = await AuthRepo.getUserByEmail(userData?.email);
  if (!dbUserdata) {
    throw new AppError("Invalid token", 401);
  }
  
  // input and db token checking
  const authData = await AuthRepo.getAuthByUserId(dbUserdata?.id);
  if (authData?.token !== token) {
    throw new AppError("Invalid token", 401);
  }

  req.userData = {...dbUserdata, auth: authData};
  next();
}

export function tokenExtractFromBearer(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token ?? null;
}
