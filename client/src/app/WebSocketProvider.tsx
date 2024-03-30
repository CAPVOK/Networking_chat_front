import React, { ReactNode, createContext } from "react";
import WebSocketService from "../services/socket";
import { WebSocketContextType } from "../types/socket.types";

export const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const webSocketService = new WebSocketService();

  return (
    <WebSocketContext.Provider value={{ webSocketService }}>
      {children}
    </WebSocketContext.Provider>
  );
};
