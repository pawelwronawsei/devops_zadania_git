const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/time', async (req, res) => {
  try {
    const conn = await mysql.createConnection({
      host: 'mysql-db',
      user: 'root',
      password: 'rootpassword',
      database: 'mydb'
    });

    const [rows] = await conn.execute('SELECT NOW() AS time');

    res.json({ status: 'ok', time: rows[0].time });

    await conn.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Backend działa na porcie 3000'));
