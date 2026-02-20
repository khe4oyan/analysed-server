// repo
import Auth from '../../repositories/auth/Auth.repo.js';

export default async function logout (req, res) {
  await Auth.logoutUser(req.userData.id);

  res.sendStatus(200);
}