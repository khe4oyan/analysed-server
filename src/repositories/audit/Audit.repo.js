// pool
import pool from "../../utils/mysql.js";

export default class Audit {
  static async list() {
    const [rows] = await pool.execute(`SELECT * FROM audit ORDER BY created_at ASC`);
    return rows;
  }
}