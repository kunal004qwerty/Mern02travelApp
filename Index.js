import * as dotenv from "dotenv";
dotenv.config();
// console.log(process.env.MONGOOS_URL);

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import pinRoute from "./routes/pins.js";
import userRoute from "./routes/users.js";

// !-----------------------
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const app = express();

const __dirname = path.dirname(__filename);
// console.log("directory-name 👉️", __dirname);

// STATIC_FILES;
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// !----------------------

const MONGOOS_ATLES_URL = process.env.MONGOOS_URL;
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

// !------MONGO_DB CONNECTION
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGOOS_ATLES_URL, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER running on PORT http://localhost:${PORT}/`);
  });
});
// mongoose
//   .connect(MONGOOS_ATLES_URL, { useNewUrlParser: true })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`SERVER running on PORT http://localhost:${PORT}/`);
//     });
//   })
//   .catch((error) => console.log(error.message));
