// service 
import registerService from '../../services/auth/register.service.js';

export default async function register(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const full_name = req.body.full_name;

  await registerService(email, password, full_name);
  res.status(201).send({ message: "Account registered" });
} 