import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";
const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit: "40kb", extended:true}))

app.use("/api/v1/users", userRoutes);
// app.use("/api/v2/users", newUserRoutes);

const start = async () => {
  const connectionDb = await mongoose.connect(
    "mongodb+srv://tanishqlokhande2005_db_user:Signal%4024032026@cluster0.joqdsug.mongodb.net/?appName=Cluster0",
  );
  console.log(`Mongo Connected to DB Host: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("Listening on port 8000");
  });
};

start();
