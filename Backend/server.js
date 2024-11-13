const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/sequelize');
const User = require('./models/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;



app.get('/', (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password});
})

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});