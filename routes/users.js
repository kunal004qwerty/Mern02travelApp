import express from "express";

import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// REGISTER

router.post("/register", async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and send response
    const user = await newUser.save();

    // res.send(user);
    res.status(200).json(user._id);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // find user
    const result = await User.findOne({ username: username });

    if (result != null) {
      // validate password
      const validPassword = await bcrypt.compare(password, result.password);
      // =========================================================
      if (validPassword) {
        // send response
        res.status(200).json({ _id: result._id, username: result.username });
      } else {
        res.status(400).json("Wrong username or password");
      }

      // =========================================================
    } else {
      res.status(400).json("Wrong username or password");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
