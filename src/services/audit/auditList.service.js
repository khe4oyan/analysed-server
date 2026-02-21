// repository
import AuditRepo from "../../repositories/audit/Audit.repo.js";

export default async function auditList() {
  const result = await AuditRepo.list();
  return result;
}