/**
 * @author Tom Shortridge
 */
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.DB_CONNECTION_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB Connected!");
    });

    connection.on("error", (err) => {
      console.log("DB connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}
