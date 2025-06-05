const pool = require("./db");

module.exports = {
  findAll: async () => {
    const res = await pool.query(`SELECT * FROM categories ORDER BY id ASC`);
    return res.rows;
  },

  findById: async (id) => {
    const res = await pool.query(
      `SELECT * FROM categories WHERE id = $1 ORDER BY id ASC`,
      [id]
    );

    return res.rows[0] || null;
  },

  create: async (event) => {
    const { name, created_by } = category;
    const res = await pool.query(
      "INSERT INTO categories (name, created_by) VALUES ($1, $2) RETURNING *",
      [name, created_by]
    );
    return res.rows[0];
  },
};
