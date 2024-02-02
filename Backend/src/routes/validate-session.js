import { validatePassword } from "../../lib/auth.js";
import { Session, User } from "../../lib/mongodb/schema.js";
export const validateSessionRoute = async (req, res) => {
  const id = req.cookies.session_id;
  const token = req.cookies.session_token;
  if (id == undefined || token == undefined) return res.json({});

  const session = await Session.findById(id);
  if (session == null) return res.json({});

  if (await validatePassword(session.token, token)) {
    const user = await User.findOne({
      email: session.email,
    });
    if (user == null) return res.json({});
    return res.json({
      name: user.name,
      email: user.email,
      done: true,
    });
  } else return res.json({});
};
