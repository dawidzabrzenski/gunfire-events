const pool = require("./db");

module.exports = {
  createUser: async ({
    first_name,
    last_name,
    email,
    username,
    password,
    phone,
    voivodeship_id,
    group_link,
    facebook_link,
    role = "user",
    is_active = true,
  }) => {
    const res = await pool.query(
      `INSERT INTO users (first_name, last_name, email, username, password, phone, voivodeship_id, group_link, facebook_link, role, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, first_name, last_name, email, username, role, is_active`,
      [
        first_name,
        last_name,
        email,
        username,
        password,
        phone,
        voivodeship_id,
        group_link,
        facebook_link,
        role,
        is_active,
      ]
    );
    return res.rows[0];
  },

  findByUsername: async (username) => {
    const res = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return res.rows[0];
  },

  findByEmail: async (email) => {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return res.rows[0];
  },

  findById: async (id) => {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0];
  },
};
