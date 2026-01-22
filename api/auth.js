import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1
});

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const { rows } = await pool.query(
      "SELECT id, email FROM admins WHERE email = $1 AND password_hash = $2",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    return res.status(200).json({
      success: true,
      admin: rows[0]
    });
  } catch (error) {
    console.error("Erro auth:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
