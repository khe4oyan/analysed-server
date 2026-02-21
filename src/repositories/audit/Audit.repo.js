// pool
import pool from "../../utils/mysql.js";

export default class Audit {
  static async list() {
    const [rows] = await pool.execute(`SELECT * FROM audit ORDER BY created_at DESC`);
    return rows;
  }

  static async create(userId, details) {
    await pool.execute(`INSERT INTO audit (user_id, details) VALUES (?, ?)`, [userId, details]);
  }
}