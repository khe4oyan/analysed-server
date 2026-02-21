// repository
import AuditRepo from "../../repositories/audit/Audit.repo.js";

export default async function createAudit(userId, details) {
  await AuditRepo.create(userId, details);
}