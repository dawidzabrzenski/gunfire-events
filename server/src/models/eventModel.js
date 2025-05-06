const pool = require("../db");
module.exports = {
  create: async (event) => {
    const {
      title,
      description,
      photo,
      category_id,
      fee,
      city,
      postal,
      street,
      region,
      date,
      organizer_id,
    } = event;
    const res = await pool.query(
      `INSERT INTO events (title, description, photo, category_id, fee, city, postal, street, region, date, organizer_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [
        title,
        description,
        photo,
        category_id,
        fee,
        city,
        postal,
        street,
        region,
        date,
        organizer_id,
      ]
    );
    return res.rows[0];
  },
};
