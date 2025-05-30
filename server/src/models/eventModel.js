const pool = require("./db");

module.exports = {
  findAll: async () => {
    const res = await pool.query(`SELECT * FROM events ORDER BY date ASC`);
    return res.rows;
  },

  findByParams: async (params) => {
    const {
      category_id,
      city,
      date,
      voivodeship_id,
      organizer_id,
      title,
      status,
      sortBy = "date",
      sortOrder = "ASC",
      page = 1,
      limit = 10,
    } = params;

    let paramIndex = 1;
    const conditions = [];
    const values = [];

    const filters = [
      { key: "category_id", column: "category_id", cast: Number },
      { key: "city", column: "city", trim: true },
      { key: "date", column: "DATE(date)" },
      { key: "date_from", column: "DATE(date)", operator: ">=" },
      { key: "date_to", column: "DATE(date)", operator: "<=" },
      { key: "voivodeship_id", column: "voivodeship_id", cast: Number },
      { key: "organizer_id", column: "organizer_id", cast: Number },
      { key: "title", column: "title", trim: true },
      { key: "status", column: "status", trim: true },
    ];

    filters.forEach(({ key, column, trim, cast, operator = "=" }) => {
      let val = params[key];
      if (val === null || val === undefined) return;

      if (trim && typeof val === "string") val = val.trim();
      if (val === "") return;

      if (cast) val = cast(val);

      conditions.push(`${column} ${operator} $${paramIndex}`);
      values.push(val);
      paramIndex++;
    });

    if (params.search?.trim()) {
      const searchTerm = `%${params.search.trim()}%`;
      conditions.push(
        `(title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`
      );
      values.push(searchTerm);
      paramIndex++;
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const offset = (page - 1) * limit;

    const ALLOWED_SORT_FIELDS = ["date", "title", "city", "fee", "id"];
    const sortField = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : "date";
    const sortDirection = sortOrder?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const countQuery = `SELECT COUNT(*) FROM events ${whereClause}`;
    const countRes = await pool.query(countQuery, values);
    const total = parseInt(countRes.rows[0].count, 10);

    const eventsQuery = `
      SELECT * FROM events 
      ${whereClause}
      ORDER BY ${sortField} ${sortDirection}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;

    const eventsRes = await pool.query(eventsQuery, [...values, limit, offset]);

    return { events: eventsRes.rows, total };
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
      latitude,
      longitude,
    } = event;
    const res = await pool.query(
      "INSERT INTO events (title, description, image_url, category_id, fee, city, postal_code, street, voivodeship_id, date, organizer_id, fps, status, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
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
        latitude,
        longitude,
      ]
    );
    return res.rows[0];
  },
};
