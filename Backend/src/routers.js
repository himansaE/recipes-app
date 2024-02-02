import { Router } from "express";
import { registerRoute } from "./routes/register.js";
import { validateSessionRoute } from "./routes/validate-session.js";
import { loginRoute } from "./routes/login.js";
import { addRoute } from "./routes/add.js";
import { recipeRoute } from "./routes/recipe.js";
import { deleteRoute } from "./routes/delete.js";
import { editRoute } from "./routes/edit.js";

const routes = Router();

routes.post("/login", loginRoute);

routes.post("/register", registerRoute);

routes.post("/validate-session", validateSessionRoute);
routes.post("/add", addRoute);
routes.get("/recipe/:id", recipeRoute);
routes.post("/delete", deleteRoute);
routes.post("/edit", editRoute);

export default routes;
