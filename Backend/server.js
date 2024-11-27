const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/sequelize.js');

/*import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/sequelize';*/


const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
/*import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';*/

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/api/tables', async (req, res) => { try { const [results, metadata] = await sequelize.query("SHOW TABLES"); res.json(results); } catch (error) { console.error('Error fetching tables:', error); res.status(500).json({ error: 'Failed to fetch tables' }); } });

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});