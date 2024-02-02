import { hash, compare } from "bcrypt";
import { Session } from "./mongodb/schema.js";
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
