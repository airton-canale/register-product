import express from "express";
import setupMiddlewares from "../infra/middlewares/index.js";
import cookieParser from "cookie-parser";
import sessionMiddleware from "express-session";


const app = express();

export const main = () => {
    const app = express();
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
}

app.listen(process.env.BACKEND_PORT, () => console.log(`Server running on port ${process.env.BACKEND_PORT}`))