// backend/server.js
const express = require('express');
const { Client } = require('pg');
const AWSXRay = require('aws-xray-sdk');

const app = express();
const PORT = 3000;

// Enable X-Ray
AWSXRay.config([AWSXRay.plugins.EC2Plugin]);
app.use(AWSXRay.express.openSegment('MyApp'));

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

app.get('/api/data', async (req, res) => {
    const result = await client.query('SELECT NOW()');
    res.send(result.rows);
});

app.use(AWSXRay.express.closeSegment());

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
