import { Server, Socket } from "socket.io";
import { randomUUID } from "crypto";
export function chatSocket(io: Server, socket: Socket) {

  const userId = socket.data.userId;

  // личная комната пользователя
  socket.join(userId);

  console.log("User online:", userId);

  socket.on("send-message", ({ toUserId, text }) => {
    console.log("toUserId---", toUserId);
    console.log("text---", text);
    const message = {
      id: randomUUID(),
      from: userId,
      to: toUserId,
      text,
      createdAt: new Date().toISOString(),
    };

    io.to(toUserId).emit("new-message", message);

    socket.emit("new-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User offline:", userId);
  });
}
