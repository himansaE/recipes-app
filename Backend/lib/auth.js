import { hash, compare } from "bcrypt";
import { Session, User } from "./mongodb/schema.js";
export const hashPassword = async (pass) => {
  return await hash(pass, 10);
};

export const validatePassword = async (hash, pass) => {
  return await compare(pass, hash);
};

export const createSession = async (res, email) => {
  const session_id = crypto.randomUUID();
  const expire_date = new Date();
  expire_date.setMonth(expire_date.getMonth() + 1);
  const session = new Session({
    email,
    token: await hashPassword(session_id),
    expire_date,
  });

  const session_req = await session.save();

  res.cookie("session_token", session_id, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.cookie("session_id", session_req.id, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};

/**  validate user session by request*/
export const validateSession = async (req) => {
  const id = req.cookies.session_id;
  const token = req.cookies.session_token;
  if (id == undefined || token == undefined) return false;

  const session = await Session.findById(id);
  if (session == null) return false;

  if (await validatePassword(session.token, token)) {
    const user = await User.findOne({
      email: session.email,
    });
    //TODO:: check expire
    if (user == null) return false;
    return user;
  } else return false;
};
