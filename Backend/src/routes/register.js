import { apiDone, apiError } from "../../lib/api.js";
import { User } from "../../lib/mongodb/schema.js";

import { createSession, hashPassword } from "../../lib/auth.js";

export const registerRoute = async (req, res) => {
  const { name, email, pass } = req.body;

  // validate input
  if (!(typeof name == "string" && name.trim() != ""))
    return res.json(apiError({ in: "name", text: "Invalid Username." }));
  if (
    !(
      typeof email == "string" &&
      /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/.test(
        email
      )
    )
  )
    return res.json(apiError({ in: "email", text: "Invalid Email Address." }));

  if (!(typeof pass == "string" && !(pass.length < 8)))
    return res.json(
      apiError({
        in: "pass",
        text: "Password must conation at least 8 characters.",
      })
    );

  // Check for existing user
  const existing_user = await User.findOne({ email });
  if (existing_user)
    return res.json(apiError({ in: "email", text: "User already exists." }));

  // create user
  const new_user = new User({ name, email, hash: await hashPassword(pass) });
  await new_user.save();

  // create session
  await createSession(res, email);

  return res.json(apiDone(""));
};
