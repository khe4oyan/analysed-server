// pool
import pool from "../../utils/mysql.js";

// utils
import AppError from "../../utils/AppError.class.js";

// constants
import { PURCHASE_STATUSES } from '../../constants/purchaseStatusTypes.js';

export default class Purchase {
  // private
  static async #getList(condition = "", values = []) {
    const [row] = await pool.execute(`SELECT * FROM purchase_requests ${condition}`, values);
    return row;
  }

  // public
  static async listForAdmin() {
    return await Purchase.#getList(`WHERE status != ?`, [PURCHASE_STATUSES.DRAFT]);
  };
  
  static async listForManager() {
    return await Purchase.#getList(`WHERE status != ?`, [PURCHASE_STATUSES.DRAFT]);
  };
  
  static async listForStaff(userId) {
    return await Purchase.#getList(`WHERE created_by_id = ?`, [userId]);
  };

  static async create(title, amount, userId) {
    const [row] = await pool.execute(`
      INSERT INTO purchase_requests (title, amount, created_by_id)
      VALUES(?, ?, ?)`,
      [title, amount, userId]
    );

    if (row.affectedRows > 0) {
      return row.insertId;
    }

    throw new AppError("Purchase is not created", 500);
  }

  static async purchaseById(id) {
    const [row] = await pool.execute(`SELECT * FROM purchase_requests WHERE id = ?`, [id]);
    return row[0];
  }

  static async updateById(id, title, amount) {
    const [row] = await pool.execute(`
      UPDATE purchase_requests 
      SET title = ?, amount = ? 
      WHERE id = ?`, 
      [title, amount, id]
    );

    return row.affectedRows > 0;
  }

  static async updateStatus(id, status, approved_id) {
    const [row] = await pool.execute(`
      UPDATE purchase_requests 
      SET status = ?, approved_by_id = ?
      WHERE id = ?`, 
      [status, approved_id, id]
    );

    return row.affectedRows > 0;
  }

  static async deleteById(id) {
    const [row] = await pool.execute(`
      DELETE FROM purchase_requests 
      WHERE id = ?`, 
      [id]
    );

    return row.affectedRows > 0;
  }
}