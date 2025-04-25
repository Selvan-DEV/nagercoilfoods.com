// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:5001"); // ✅ change to your server URL
  }

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};
