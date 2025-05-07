const pool = require("./db");

module.exports = {
  createVerificationToken: async (userId, token) => {
    await pool.query(
      `INSERT INTO email_verification_tokens (user_id, token, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '24 hours')`,
      [userId, token]
    );
  },

  upsertVerificationToken: async (userId, token) => {
    await pool.query(
      `INSERT INTO email_verification_tokens (user_id, token, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '24 hours')
       ON CONFLICT (user_id)
       DO UPDATE SET token = $2, expires_at = NOW() + INTERVAL '24 hours'`,
      [userId, token]
    );
  },

  findByToken: async (token) => {
    const res = await pool.query(
      `SELECT user_id, expires_at FROM email_verification_tokens WHERE token = $1`,
      [token]
    );
    return res.rows[0];
  },

  deleteByToken: async (token) => {
    await pool.query(`DELETE FROM email_verification_tokens WHERE token = $1`, [
      token,
    ]);
  },
};
