// service
import getUserByIdService from "../../services/users/getUserById.service.js";

export default async function getById(req, res) {
  const userData = await getUserByIdService(req.params.id);

  res.status(200).send({ success: true, userData});
}