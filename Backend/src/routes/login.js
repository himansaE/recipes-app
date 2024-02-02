import { apiDone, apiError } from "../../lib/api.js";
import { createSession, validatePassword } from "../../lib/auth.js";
import { User } from "../../lib/mongodb/schema.js";

export const loginRoute = async (req, res) => {
  const { email, pass } = req.body;

  // validate input

  if (
    !(
      typeof email == "string" &&
      /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/.test(
        email
      )
    )
  )
    return res.json(apiError({ in: "email", text: "Invalid Email Address." }));

  if (!(typeof pass == "string" && !(pass.length <= 8)))
    return res.json(
      apiError({
        in: "pass",
        text: "Invalid Password.",
      })
    );

  // get user by email

  const user = await User.findOne({
    email,
  });

  if (user == null)
    return res.json(
      apiError({
        in: "email",
        text: "There is no Account for this e-mail. Try Register first.",
      })
    );

  if (await validatePassword(user.hash, pass)) {
    await createSession(res, email);
    return res.json(apiDone());
  }
  res.json(
    apiError({
      in: "pass",
      text: "Invalid Password.",
    })
  );
};
