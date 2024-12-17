const express = require("express");
const User = require("../models/user");
const router = express.Router;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: email }],
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, role: user.role }, "secretkey", {
        expiresIn: "1h",
      });
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "username", "email", "role"],
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
