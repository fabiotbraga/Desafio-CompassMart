import mongoose from "mongoose";

export async function connectDBForTesting() {
  try {
    const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.${process.env.URL_ID}.mongodb.net/${process.env.DB_NAME}`;
    const dbName = `${process.env.DB_NAME}`;
    await mongoose.connect(dbUri, {
      dbName,
      autoCreate: true
    });
  } catch (error) {
    console.log("DB connect error");
  }
}

export async function disconnectDBForTesting() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log("DB disconnect error");
  }
}
