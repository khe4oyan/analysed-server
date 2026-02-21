import "dotenv/config";
import pool from "../src/utils/mysql.js";

const users = [
  { email: "staff@gmail.com", full_name: "Staff Staffovich", role: "staff" },
  { email: "manager@gmail.com", full_name: "Manager Manageryan", role: "manager" },
  { email: "admin@gmail.com", full_name: "Admin Adminyan", role: "admin" },
];

const password = "qweqwe123";

async function register() {
  for (let i = 0; i < users.length; ++i) {
    const { email, full_name, role } = users[i];

    const r = await fetch(`http://localhost:${process.env.SERVER_PORT}/api/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        full_name,
      }),
    })

    const d = await r.json();

    if (d?.success) {
      console.log("Success");
      await pool.execute(
        `UPDATE users SET role = ? WHERE email = ?`, 
        [role,email,]
      );
    } else {
      console.log(d?.message);
    }
  }

  await pool.end();
}

register();