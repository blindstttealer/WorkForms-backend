import { Socket } from "socket.io";
import { verifyJwtToken } from "../lib/jwt.utils";
import { JwtPayload } from "jsonwebtoken";

interface AuthSocketJwtPayload extends JwtPayload {
  id: string
}

export function socketAuth(socket: Socket, next: (err?: Error) => void) {
  try {
    const cookieHeader = socket.handshake.headers.cookie;
    console.log("socket.handshake", socket.handshake);
    console.log("cookieHeader", cookieHeader);
    if (!cookieHeader) {
      return next(new Error("No cookies"));
    }

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("="))
    );

    const token = cookies["short_token"] || cookies["long_token"];

    if (!token) {
      return next(new Error("No auth token"));
    }

    const payload = verifyJwtToken(token) as AuthSocketJwtPayload;

    socket.data.userId = payload.id;

    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
}
