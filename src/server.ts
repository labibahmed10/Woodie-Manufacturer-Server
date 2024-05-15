import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function ConnectDB() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log("⚡ Database has connected successfully");
    app.listen(config.port, () => {
      console.log(`The port is connected to ${config.port} ⚓`);
    });
  } catch (error) {
    console.error(error);
  }
}

ConnectDB();
