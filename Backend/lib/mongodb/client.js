import { connect } from "mongoose";

export async function ConnectMongoDBClient() {
  const MONGODB_URL = process.env.MONGODB_URL;
  if (MONGODB_URL == undefined) {
    console.log("[Error] - MONGODB_URL not defined in .env file.");
    process.exit();
  }
  try {
    await connect(MONGODB_URL ?? "");
    console.log("[Server] - Connected to the database.");
  } catch {
    console.log("[Error] - Error happened while connecting to the database");
    process.exit();
  }
}
