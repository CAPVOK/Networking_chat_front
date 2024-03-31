import { useContext } from "react";
import { WebSocketContext } from "../app/provides/WebSocketProvider";

export const useWebSocket = () => {
  const socketContext = useContext(WebSocketContext);

  if (!socketContext) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }

  return socketContext;
};
