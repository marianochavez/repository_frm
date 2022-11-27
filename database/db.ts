import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0,
};

/**
 * It connects to MongoDB if it's not already connected
 * @returns A promise that resolves to void.
 */
const connect = async (): Promise<void> => {
  if (mongoConnection.isConnected) {
    console.log("Already connected to mongo");

    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log("Using previous mongo connection");

      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongoConnection.isConnected = 1;
  console.log("Connected to MongoDB", process.env.MONGO_URL);
};

/**
 * Disconnect MongoDB.
 * Only for production mode.
 * @returns A promise that resolves to void
 */
const disconnect = async (): Promise<void> => {
  if (process.env.NODE_ENV === "development") return;

  if (mongoConnection.isConnected === 0) return;

  mongoConnection.isConnected = 0;
  await mongoose.disconnect();

  console.log("Disconnected from MongoDB");
};

const db = { connect, disconnect };

export default db;