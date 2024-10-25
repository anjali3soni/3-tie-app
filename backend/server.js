// backend/server.js
const express = require('express');
const { Client } = require('pg');


const app = express();
const PORT = 3000;



const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

app.get('/api/data', async (req, res) => {
    const result = await client.query('SELECT NOW()');
    res.send(result.rows);
});



app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
