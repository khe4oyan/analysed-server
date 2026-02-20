// utils
import AppError from '../../utils/AppError.class.js';
import { hash } from '../../utils/bcript.js';

// repo
import AuthRepo from '../../repositories/auth/Auth.repo.js';

export default async function register(email, password, full_name) {
  if (await AuthRepo.isEmailRegistered(email)) {
    throw new AppError("Email is busy", 409);
  }

  const passHash = hash(password);

  await AuthRepo.createUser(email, passHash, full_name);
}
