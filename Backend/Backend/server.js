const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/sequelize");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json()); // read json
app.use(express.urlencoded({ extended: true })); // read html form input

const PORT = process.env.PORT || 5000;

const authRoutes = require("./src/routes/authRoute");
const userRoutes = require("./src/routes/userRoute");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
