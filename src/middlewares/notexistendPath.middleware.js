export default async function notexistendPath(req, res) {
  res.status(404).send({ message: "Undefined path" });
}