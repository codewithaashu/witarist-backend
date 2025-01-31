import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createHandler } from "graphql-http";
import schema from "./schema/schema.js";
import connectDB from "./config/db.js";
const app = express();

//config dotenv
dotenv.config();

//middleware for cors
app.use(
  cors({
    // origin: process.env.ORIGIN,
    // allowedHeaders: "*",
    // credentials: true,
  })
);

//middleware for acception json data
app.use(express.json());

//midlleware(creating routes) for using graphql
app.all("/graphql", createHandler({ schema }));

//connect database
connectDB();
app.get("/", (_, res) => {
  res.send("Hello");
});

//listen the server request
app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT ${process.env.PORT}`);
});
