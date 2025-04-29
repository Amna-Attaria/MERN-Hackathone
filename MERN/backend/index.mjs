import express from "express";
import cors from "cors";
import connectToDB from "./db/index.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import taskRoutes from "./routes/taskRoutes.mjs";

connectToDB();
const app = express();

// ⭐ CORS Setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://mern-hackathone-dwba.vercel.app',
  'https://mern-hackathone-1mkr.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Important: cors middleware first
app.options('*', cors(corsOptions)); // Handle Pre-flight properly

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
