import { createServer } from "http";
import { execute, subscribe } from "graphql";
import mongoose from 'mongoose'
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {resolvers} from "./graphql/resolvers.js";
import {typeDefs} from "./graphql/typeDefs.js";
// var database = "mongodb://localhost:27017/demo"
(async function () {
  const app = express();
  const uri = "mongodb+srv://testuser:testpassword@cluster0.knnkc.mongodb.net/book?retryWrites=true&w=majority";
  await mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true })
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/graphql' }
  );

  const server = new ApolloServer({
    schema,
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        };
      }
    }],
  });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
})();

