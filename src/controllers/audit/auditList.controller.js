// services
import auditListService from "../../services/audit/auditList.service.js";

export default async function auditList(req, res) {
  const audit = await auditListService();

  res.status(200).json({ success: true, audit });
}