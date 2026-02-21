// repository
import UsersRepo from '../../repositories/users/Users.repo.js';

export default async function getUserById(userId) {
  const userData = await UsersRepo.getById(userId);
  return userData;
}