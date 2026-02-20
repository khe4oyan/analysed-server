// pool
import pool from "../../utils/mysql.js";

// utils
import AppError from "../../utils/AppError.class.js";

export default class Auth {
  // private
  static async #newUser(email, full_name) {
    const [result] = await pool.execute(
      `INSERT INTO users (email, full_name) VALUES (?, ?)`,
      [email, full_name]
    );
    return result.insertId;
  }

  static async #newAuth(userId, passHash) {
    await pool.execute(
      `INSERT INTO auth (user_id, password_hash) VALUES (?, ?)`,
      [userId, passHash]
    );
  }

  // public
  static async isEmailRegistered(email) {
    try {
      const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, 
        [email,]
      );
      return rows.length > 0;
    } catch (error) {
      throw new AppError("Email checking error", 500);
    }
  }

  static async createUser(email, pass_hash, full_name) {
    const userId = await Auth.#newUser(email, full_name);
    await Auth.#newAuth(userId, pass_hash);
  }

  static async getUserByEmail(email) {
    return (await pool.execute(`SELECT * FROM users WHERE email = ?`, [email]))[0][0];
  }

  static async getPassHash(userId) {
    return (await pool.execute(`SELECT password_hash FROM auth WHERE user_id = ?`, [userId]))[0][0]?.password_hash;
  }

  static async tokenSave(userId, token) {
    return await pool.execute(`UPDATE auth SET token = ? WHERE user_id = ?`, [token, userId]);
  }

  static async getAuthByUserId(userId) {
    return (await pool.execute(`SELECT * FROM auth WHERE user_id = ? `, [userId]))[0][0];
  }

  static async updatePassword(userId, newPassHash) {
    return (await pool.execute(`UPDATE auth SET password_hash = ? WHERE user_id = ? `, [newPassHash, userId]));
  }

  static async logoutUser(userId) {
    await pool.execute(`UPDATE auth SET token = NULL WHERE user_id = ?`, [userId]);
  }

  static async deleteUser(userId) {
    const [res] = await pool.execute(`DELETE FROM auth WHERE user_id = ?`, [userId]);
    return res.affectedRows > 0;
  }
}
