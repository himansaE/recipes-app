import { Router } from "express";
import { registerRoute } from "./routes/register.js";
import { validateSessionRoute } from "./routes/validate-session.js";
import { loginRoute } from "./routes/login.js";
import { addRoute } from "./routes/add.js";

const routes = Router();

routes.post("/login", loginRoute);

routes.post("/register", registerRoute);

routes.post("/validate-session", validateSessionRoute);
routes.post("/add", addRoute);

export default routes;
