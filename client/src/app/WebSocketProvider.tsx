import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { IMessageRequest } from "../types/chat.types";

interface IWebsocketContext {
  socket: WebSocket | null;
  createConnection: () => void;
  sendMessage: (message: IMessageRequest) => void;
  closeConnection: () => void;
}

const HOST = import.meta.env.VITE_SOCKET_HOST;

export const WebSocketContext = createContext<IWebsocketContext | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<WebSocket | null>(null);

  const createConnection = useCallback(() => {
    if (!socketRef.current) {
      const newSocket = new WebSocket(`ws://${HOST}/websockets`);

      newSocket.onopen = () => {
        console.log("WebSocket connection established.");
      };

      newSocket.onclose = () => {
        console.log("WebSocket connection closed.");
      };

      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socketRef.current = newSocket;
    }
  }, [socketRef]);

  const closeConnection = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
      socketRef.current = null;
    }
  }, []);

  const sendMessage = useCallback(
    (message: IMessageRequest) => {
      if (socketRef.current) {
        socketRef.current.send(JSON.stringify(message));
      }
    },
    [socketRef]
  );

  useEffect(() => {
    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        console.log("context useEffect");
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  const context: IWebsocketContext = {
    sendMessage,
    socket: socketRef.current,
    createConnection,
    closeConnection,
  };

  return (
    <WebSocketContext.Provider value={context}>
      {children}
    </WebSocketContext.Provider>
  );
};
