export default async function notexistendPath(req, res) {
  res.status(404).json({ message: "Undefined path" });
}