import { config } from "./config";
import * as mongoose from 'mongoose';

export default async function globalTeardown() {
  await mongoose.disconnect()

  if (config.Memory) { // Config to decide if an mongodb-memory-server instance should be used
    const instance = global.__MONGOINSTANCE;
    await instance.stop();
  }
};
