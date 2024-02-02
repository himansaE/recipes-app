import { apiDone } from "../../lib/api.js";
import { validateSession } from "../../lib/auth.js";
import { Recipe } from "../../lib/mongodb/schema.js";

export const deleteRoute = async (req, res) => {
  const user = await validateSession(req);
  if (user == false)
    return res.json(
      apiError({
        error: "Error. Session expired. Login again.",
      })
    );
  if (req.body.id == undefined)
    return res.json(
      apiError({
        error: "Invalid Input",
      })
    );

  // get recipe to delete
  const recipe = await Recipe.findById(req.body.id);
  if (recipe == null)
    return res.json(
      apiError({
        error: "Invalid Input",
      })
    );

  // block if owner is wrong
  if (recipe.user_id != user.id)
    return res.json(
      apiError({
        error: "Invalid Input",
      })
    );

  // delete recipe

  await Recipe.findByIdAndDelete(recipe.id);

  return res.json(apiDone(""));
};
