import mongoose from "mongoose";
import { envVars } from "./envVars.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(envVars.MONGO_URI)
        console.log("MongoDB Connected : " + conn.connection.host)
    } catch (error) {
        console.log("MongoDB Connection Failed.")
        process.exit(1) //1 means error, 0 means success.
    }
}
