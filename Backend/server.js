const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/sequelize.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});