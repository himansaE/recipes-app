import { apiDone, apiError } from "../../lib/api.js";
import { validateSession } from "../../lib/auth.js";
import { Recipe } from "../../lib/mongodb/schema.js";
export const listRoute = async (req, res) => {
  const user = await validateSession(req);
  if (user == false)
    return res.json(
      apiError({
        in: "all",
        text: "Session Expired. Refresh Page and login again",
      })
    );
  return res.json(
    apiDone(
      (await Recipe.find({ user_id: user.id })).map((i) => ({
        id: i.id,
        recipe_name: i.recipe_name,
        ingredients: i.ingredients,
        description: i.description,
      }))
    )
  );
};
