const pool = require("./db");

module.exports = {
  findAll: async () => {
    const res = await pool.query(`SELECT * FROM categories ORDER BY id ASC`);
    return res.rows;
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
