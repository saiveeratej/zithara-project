const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customer_data',
  password: 'SVT6svt$11',
  port: 5432,
});
const corsOptions = {
  origin: 'http://localhost:3000', // This should be the origin of your React app
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); 
app.use(express.json());

// Endpoint to fetch paginated customers
app.get('/customers', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
const search = req.query.search || '';
 const sort = req.query.sort || 'date'; // Default sort by date

  const offset = (page - 1) * limit;

  try {
 let query;
    let params;

   if (search) {
      query = `SELECT sno, customer_name, age, phone, location, created_at::date AS date, created_at::time AS time 
               FROM customers 
               WHERE customer_name ILIKE $1 OR location ILIKE $1 
               ORDER BY ${sort} 
               LIMIT $2 OFFSET $3`;
      params = [`%${search}%`, limit, offset];
    } else {
      query = `SELECT sno, customer_name, age, phone, location, created_at::date AS date, created_at::time AS time 
               FROM customers 
               ORDER BY ${sort} 
               LIMIT $1 OFFSET $2`;
      params = [limit, offset];
    }
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
