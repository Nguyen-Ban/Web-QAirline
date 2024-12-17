const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/sequelize");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json()); // read json
app.use(express.urlencoded({ extended: true })); // read html form input

const PORT = process.env.PORT || 4000;

const apiRoute = require("./src/routes/apiRoute");
app.use("/api", apiRoute);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
