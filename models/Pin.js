import mongoose from "mongoose";

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      // unique: true,
    },
    title: {
      type: String,
      require: true,
      max: 3,
      // unique: true,
    },
    desc: {
      type: String,
      require: true,
      min: 6,
      // unique: true,
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
    },
    lat: {
      type: Number,
      require: true,
    },
    long: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
  { strict: false }
);

const Pin = mongoose.model("Pin", PinSchema);

export default Pin;
