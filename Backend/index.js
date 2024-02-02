import { ConnectMongoDBClient } from "./lib/mongodb/client.js";
import app from "./src/server.js";

import { config as env } from "dotenv";

// init env
env();
const PORT = process.env.PORT ?? "3001";

async function server() {
  await ConnectMongoDBClient();
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
}
server();
