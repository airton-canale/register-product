import express from "express";
import setupMiddlewares from "../infra/middlewares/index.js";
import cookieParser from "cookie-parser";
import sessionMiddleware from "express-session";
import { router } from "../infra/routes/index.js";
import cors from "cors";

const app = express();
export const main = () => {
  setupMiddlewares(app);
  app.use(router);
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

app.listen(3003, () =>
  console.log(`Server running on port 3003`)
);
