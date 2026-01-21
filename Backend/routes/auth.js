const express = require('express');
const pool = require('../db');
const router = express.Router();


router.post('/login', async (req, res) => {
const { email, password } = req.body;
const { rows } = await pool.query(
'SELECT * FROM admins WHERE email=$1 AND password=$2',
[email, password]
);


if (rows.length === 0) return res.status(401).json({ error: 'Login inválido' });
res.json({ success: true });
});


module.exports = router;