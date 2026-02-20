// service
import loginService from '../../services/auth/login.service.js';

// classes
import AppError from '../../utils/AppError.class.js';

export default async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const serviceResult = await loginService(email, password);

  if (serviceResult?.token) {
    res.status(201).send({ token: serviceResult.token });
  } else {
    throw new AppError("Authentication failed", 401);
  }
}