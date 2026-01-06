import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./router";
import cors from "cors";
import { initSocket } from "./socket";
import http from "http";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);

const server = http.createServer(app);

initSocket(server);

app.use("/api", router);

const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
  console.log(`Server + Socket.IO started on port ${PORT}`);
});
