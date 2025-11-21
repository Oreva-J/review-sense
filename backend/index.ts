import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes/summerizerRoute";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Dynamic CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      // In development, allow all localhost
      if (process.env.NODE_ENV === "development") {
        if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
          return callback(null, true);
        }
      }

      // Check if origin is in allowed list or matches Vercel pattern
      if (allowedOrigins.includes(origin) || origin.includes(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Summerizer API is running",
    endpoints: {
      health: "/api/health",
      products: "/api/products/:id/reviews",
      summarize: "/api/products/:id/summarize",
    },
  });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
