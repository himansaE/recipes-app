import { apiDone, apiError } from "../../lib/api.js";
import { validateSession } from "../../lib/auth.js";
import { Recipe } from "../../lib/mongodb/schema.js";

export const recipeRoute = async (req, res) => {
  const user = await validateSession(req);

  if (user == false)
    return res.json(
      apiError({
        error: "Error. Session expired. Login again.",
      })
    );

  // get the recipe by id and user id
  let recipe_res;

  // ignore error on wrong mongodb objectId, also database connection error
  try {
    recipe_res = await Recipe.findById(req.params.id);
  } catch (e) {
    return res.json(
      apiError({
        error: "Error. Page Not Found",
      })
    );
  }
  if (recipe_res == null)
    return res.json(
      apiError({
        error: "Error. Page Not Found",
      })
    );

  // block if recipe is not owned by this user
  if (user.id != recipe_res.user_id)
    return res.json(
      apiError({
        error: "Error. Page Not Found",
      })
    );

  const recipe = {
    id: recipe_res.id,
    recipe_name: recipe_res.recipe_name,
    description: recipe_res.description,
    ingredients: recipe_res.ingredients.map((i) => ({
      name: i.name,
      amount: i.amount,
    })),
  };
  return res.json(apiDone(recipe));
};
