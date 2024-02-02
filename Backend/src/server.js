import express from "express";
import routes from "./routers.js";
import cores from "cors";
import { config as env } from "dotenv";
import cookieParser from "cookie-parser";

// init env
env();
class App {
  server;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      cores({
        origin: [process.env.APP_URL],
        credentials: true,
      })
    );
    this.server.use(cookieParser(process.env.SITE_SECRET));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
