import { apiDone, apiError } from "../../lib/api.js";
import { validateSession } from "../../lib/auth.js";
import { Recipe } from "../../lib/mongodb/schema.js";

export const addRoute = async (req, res) => {
  const user = await validateSession(req);

  const validated = validate(req.body);
  if (validated.done == false) return res.json(validated);
  const { recipe_name, description, ingredients } = req.body;

  const recipe = await new Recipe({
    recipe_name,
    description,
    ingredients,
    user_id: user.id,
  }).save();

  return res.json(apiDone(recipe.id));
};

const validate = (data) => {
  const { recipe_name, description, ingredients } = data;
  if (!(typeof recipe_name === "string" && recipe_name.trim() != ""))
    return apiError({ in: "recipe_name", text: "Invalid recipe name." });
  if (!(typeof description === "string" && description.trim() != ""))
    return apiError({
      in: "description",
      text: "Invalid description for Recipe.",
    });
  if (!(Array.isArray(ingredients) && ingredients.length > 0))
    return apiError({
      in: "all",
      text: "Ingredient cannot be empty.",
    });

  return data;
};
