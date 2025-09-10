require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const passport = require("passport");

// Passport config
require("./config/passport")(passport);

const PORT = process.env.PORT || 3000;

// Init
const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://learntubehub.vercel.app",
        "http://localhost:5173",
      ];
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(null, true); // temporarily allow all origins
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://learntubehub.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Initialize passport
app.use(passport.initialize());

// routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/user"));
app.use("/playlist", require("./routes/playlist"));

app.use("/", require("./routes/docs"));

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

const connectDB = require("./config/db");

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("--- Server Started ---");
    console.log("MongoDB connection success");
    app.listen(PORT, () => {
      console.log(`Server running`);
      console.log("---- Logger ----");
    });
  })
  .catch((err) => {
    console.log("Connection to MongoDB was unsuccessful with error: ", err);
  });
