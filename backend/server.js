import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import userRoute from "./routes/userRoutes.js";
import connectToDB from "./db/connectToDB.js";
import { app, server } from "./socket/socket.js";
dotenv.config();

const PORT = process.env.BACKEND_PORT;

// to use the middleware
app.use(express.json());
app.use(cookieParser());

// to use the routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/users", userRoute);

// to test if the server is running
app.get("/", (req, res) => {
  res.send("Hello World");
});

// to listen to the server and get connected to the database
server.listen(PORT, () => {
  connectToDB();
  console.log(`server running on port ${PORT}`);
});
