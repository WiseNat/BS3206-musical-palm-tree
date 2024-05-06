/**
 * @author Tom Shortridge
 */
import mongoose from "mongoose";

let cachedConnection = null;

export async function connect() {
  try {
    if (cachedConnection) {
      return cachedConnection;
    }

    mongoose.connect(process.env.DB_CONNECTION_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("DB Connected!");
    });

    connection.on("error", (err) => {
      console.log("DB connection error" + err);
      process.exit();
    });
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.log(error);
  }
}
