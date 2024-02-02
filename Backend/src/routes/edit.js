import { apiDone, apiError } from "../../lib/api.js";
import { validateSession } from "../../lib/auth.js";
import { Recipe } from "../../lib/mongodb/schema.js";
export const editRoute = async (req, res) => {
  const user = await validateSession(req);
  if (user == false)
    return res.json(
      apiError({
        in: "all",
        text: "Session Expired. Refresh Page and login again",
      })
    );
  const validated = validate(req.body);
  if (validated.done == false) return res.json(validated);
  const { recipe_name, description, ingredients, id } = req.body;

  // get the recipe by id and user id
  let recipe_res;

  // ignore error on wrong mongodb objectId, also database connection error
  try {
    recipe_res = await Recipe.findById(id);
  } catch (e) {
    return res.json(
      apiError({
        in: "all",
        text: "Recipe not found.",
      })
    );
  }
  if (recipe_res == null)
    return res.json(
      apiError({
        in: "all",
        text: "Recipe not found.",
      })
    );

  // block if recipe is not owned by this user
  if (user.id != recipe_res.user_id)
    return res.json(
      apiError({
        in: "all",
        text: "Recipe not found.",
      })
    );

  await Recipe.findByIdAndUpdate(id, {
    ingredients,
    description,
    recipe_name,
  });
  return res.json(apiDone(id));
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
