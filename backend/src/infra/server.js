import express from "express";
import setupMiddlewares from "../infra/middlewares/index.js";
import cookieParser from "cookie-parser";
import sessionMiddleware from "express-session";
import { router } from "../infra/routes/index.js";
import cors from "cors";

const app = express();

export const main = () => {
  setupMiddlewares(app);
  app.use(cookieParser());
  app.use(
    sessionMiddleware({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
      sameSite: "none",
    })
  );
};
const corsOrigin = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));

app.use(router);

app.listen(process.env.BACKEND_PORT, () =>
  console.log(`Server running on port ${process.env.BACKEND_PORT}`)
);
