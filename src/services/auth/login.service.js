// repo
import AuthRepo from "../../repositories/auth/Auth.repo.js";

// utils
import AppError from "../../utils/AppError.class.js";
import { compare } from "../../utils/bcript.js";
import { createToken } from "../../utils/jwt.js";

export default async function login(email, password) {
  await emailCheck(email);
  const [userData, dbPassHash] = await userDatas(email);
  await passwordCheck(password, dbPassHash);

  const token = createToken(userData);
  
  await AuthRepo.tokenSave(userData.id, token);

  return { token };
}

async function emailCheck(email) {
  if (!(await AuthRepo.isEmailRegistered(email))) {
    throw new AppError("Invalid email", 409);
  }
}

async function userDatas(email) {
  const userData = await AuthRepo.getUserByEmail(email);
  const dbPassHash = await AuthRepo.getPassHash(userData.id);

  return [userData, dbPassHash];
}

async function passwordCheck(password, dbPassHash) {
  if (passIsInvalid(password, dbPassHash)) {
    throw new AppError("Invalid password", 401);
  }
}

function passIsInvalid(inputPass, dbPassHash) {
  return compare(inputPass, dbPassHash) === false;
}
