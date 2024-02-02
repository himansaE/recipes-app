import { Schema, model } from "mongoose";

const user = new Schema({
  name: String,
  email: String,
  hash: String,
});

const session = new Schema({
  email: String,
  token: String,
  expire_date: Date,
});

const ingredient = new Schema({
  name: String,
  amount: String,
});
const recipe = new Schema({
  user_id: Schema.ObjectId,
  title: String,
  ingredient: [ingredient],
  description: String,

  // serving_size: Number,
  // cook_time: Number,
  // perp_time: Number,
  // category: String,
  // instructions: String,
  // cost: String,
  // type: String, // is it public or privet
});

export const User = model("user", user);
export const Session = model("session", session);
export const Recipe = model("recipe", recipe);
