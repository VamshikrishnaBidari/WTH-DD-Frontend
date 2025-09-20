import React, { createContext, useMemo, useEffect, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

// Singleton socket instance
let socketInstance: Socket | null = null;

const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(`${import.meta.env.VITE_API_BASE_URL}`, {
      transports: ["websocket"],
      withCredentials: true,
      autoConnect: true,
    });
  }
  return socketInstance;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const socket = useMemo(() => getSocket(), []);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      if (userId) {
        socket.emit("register", userId);
        console.log("Sent register for user:", userId);
      }
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    return () => {
      socket.off("connect", handleConnect);
      // socket.disconnect(); // Uncomment this line if you want to disconnect on unmount
    };
  }, [socket, userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
