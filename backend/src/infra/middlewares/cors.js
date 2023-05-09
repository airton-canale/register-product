import cors from "cors";

export const corsFunction = cors({
  exposedHeaders: ["Content-Type", "_offset", "_limit", "total", "pages"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  origin: true,
  credentials: true,
});