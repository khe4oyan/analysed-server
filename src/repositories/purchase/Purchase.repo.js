// pool
import pool from "../../utils/mysql.js";

export default class Purchase {
  // private
  static async #getList(condition = "", values = []) {
    const [row] = await pool.execute(`SELECT * FROM purchase_requests ${condition}`, values);
    return row;
  }

  // public
  static async listForAdmin() {
    return await Purchase.#getList();
  };
  
  static async listForManager() {
    return await Purchase.#getList();
  };
  
  static async listForStaff(userId) {
    return await Purchase.#getList(`WHERE created_by_id = ?`, [userId]);
  };
}