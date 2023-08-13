import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Export the PORT and DB constants
export const PORT = process.env.PORT!;
export const DB = process.env.MONGO_URL!;
