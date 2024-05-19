/**
 * @author Tom Shortridge
 *
 * This creates the database connection which the system uses to open a connect with the database.
 */
import mongoose from "mongoose";

let cachedConnection = null;

export async function connect() {
  try {
    // Used to use cached connection rather than creating a new connection
    if (cachedConnection) {
      return cachedConnection;
    }

    // Initializes the connection
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
