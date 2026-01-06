import { Server } from "socket.io";
import http from "http";
import { socketAuth } from "./auth";
import { chatSocket } from "./chat";

export function initSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    chatSocket(io, socket);
  });
}
