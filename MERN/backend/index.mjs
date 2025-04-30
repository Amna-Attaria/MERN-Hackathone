import express from "express";
import cors from "cors";
import connectToDB from "./db/index.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import taskRoutes from "./routes/taskRoutes.mjs";

connectToDB();
const app = express();
const cors = require("cors");

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://mern-hackathone.vercel.app',
    'https://mern-hackathone-production-6520.up.railway.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.options('*', cors());




app.use(express.json());

// ⭐ Now Routes after CORS
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);

// (your other app.put, app.patch routes)

app.use("/", (req, res, next) => {
  console.log("Request URL:", req.url, "method:", req.method);
  next();
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥', err.name, err.message);
  process.exit(1);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
