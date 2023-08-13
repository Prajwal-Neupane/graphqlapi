import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import { PORT, DB } from "./config/default"; // Make sure to import these constants from your config file
import { resolvers } from "./resolvers"; // Make sure to import your resolvers
// You might have additional imports for authentication, models, etc.

const bootstrap = async () => {
  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers,
    // authChecker,
  });

  // Create Express app
  const app = express();
  app.use(cookieParser());

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    context: (ctx) => {
      console.log(ctx);
      return ctx;
    },
  });
  await server.start();

  // Apply Apollo middleware to Express app
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });

  // Connect to MongoDB
  try {
    await mongoose.connect(DB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

bootstrap();
