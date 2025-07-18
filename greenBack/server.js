const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const { connectAllDBs } = require("./config/db");
const authRoutes = require("./routes/userRoutes.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:4173", // Your frontend origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Optional: Logging incoming requests
app.use((req, res, next) => {
  const time = new Date().toISOString();
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(`[${time}] ${req.method} ${req.originalUrl} from ${ip}`);
  next();
});

connectAllDBs().then(() => {
  console.log("✅ All DBs connected");

  app.use("/api/auth", authRoutes);
  app.use("/api/subscribe", require("./routes/subscribe"));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => {
  console.error("❌ Error connecting to DBs:", err);
});
