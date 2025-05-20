const pool = require("./db");

module.exports = {
  findAll: async () => {
    const res = await pool.query(`SELECT * FROM events ORDER BY date ASC`);
    return res.rows;
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
      approved = false,
    } = event;
    const res = await pool.query(
      "INSERT INTO events (title, description, image_url, category_id, fee, city, postal_code, street, voivodeship_id, date, organizer_id, approved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
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
        approved,
      ]
    );
    return res.rows[0];
  },
};
