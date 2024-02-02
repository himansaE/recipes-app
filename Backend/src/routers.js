import { Router } from "express";
import { registerRoute } from "./routes/register.js";
import { validateSession } from "./routes/validate-session.js";
import { loginRoute } from "./routes/login.js";

const routes = Router();

routes.post("/login", loginRoute);

routes.post("/register", registerRoute);

routes.post("/validate-session", validateSession);

export default routes;
