// pool
import pool from "../../utils/mysql.js";

// utils
import AppError from "../../utils/AppError.class.js";

export default class Audit {
  static async list() {
    const [rows] = await pool.execute(`SELECT * FROM audit`);
    return rows;
  }
}