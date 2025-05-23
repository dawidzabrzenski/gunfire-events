const pool = require("./db");

module.exports = {
  findAll: async () => {
    const res = await pool.query(`SELECT * FROM events ORDER BY date ASC`);
    return res.rows;
  },

  findById: async (id) => {
    const res = await pool.query(
      `SELECT * FROM events WHERE id = $1 ORDER BY id ASC`,
      [id]
    );

    return res.rows[0] || null;
  },

  create: async (event) => {
    const {
      title,
      description,
      image_url,
      category_id,
      fee,
      city,
      postal_code,
      street,
      voivodeship_id,
      date,
      organizer_id,
      fps,
      status = "pending_verification",
    } = event;
    const res = await pool.query(
      "INSERT INTO events (title, description, image_url, category_id, fee, city, postal_code, street, voivodeship_id, date, organizer_id, fps, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [
        title,
        description,
        image_url,
        category_id,
        fee,
        city,
        postal_code,
        street,
        voivodeship_id,
        date,
        organizer_id,
        fps,
        status,
      ]
    );
    return res.rows[0];
  },
};
