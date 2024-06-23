import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import "crypto-browserify";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import designRoutes from './routes/designRoutes.js'

// const path = require("path");

// module.exports = {
//   // other webpack configurations...
//   resolve: {
//     fallback: {
//       crypto: require.resolve("crypto-browserify"),
//     },
//   },
// };

// import { connect } from "mongoose";
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/custom", designRoutes)

app.get("/", (req, res) => {
  res.send({
    message: "welcome to the e-commerce websites",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `listening on ${process.env.DEV_MODE} port on ${PORT}`.bgCyan.white
  );
});
