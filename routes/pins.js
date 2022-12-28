import express from "express";

import Pin from "../models/Pin.js";

const router = express.Router();

// CREATE A PIN
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL PINS
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
    // res.send(pins); // Comment it after use go to http://localhost:5000/api/pins
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
