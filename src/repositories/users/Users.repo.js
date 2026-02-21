// pool
import pool from "../../utils/mysql.js";

export default class Users {
  static async getById(userId) {
    const [rows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [userId]);
    return rows[0];
  }
}