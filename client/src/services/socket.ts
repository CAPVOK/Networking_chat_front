import { useApp } from "../store/appSlice";
import { IMessage, IMessageRequest } from "../types/chat.types";
import { SOCKET_URL } from "./constants";

class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectInterval: number | null = null;

  public connect(): void {
    this.socket = new WebSocket(SOCKET_URL);

    this.socket.onopen = () => {
      console.log("WebSocket connection established.");
      this.stopReconnect();
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.reconnect();
      /* toast.error("Ошибка подключения"); */
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const messageData: IMessage = JSON.parse(event.data);
        useApp.getState().saveMessage({ ...messageData, isLoading: false });
      } catch (error) {
        /* toast.error("Ошибка парсинга"); */
      }
    };
  }

  public sendMessage(message: IMessageRequest): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      /* toast.error("Не удалось отправить сообщение"); */
      console.error("WebSocket connection is not established.");
    }
  }

  public disconnect(): void {
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
    }
    if (this.socket) {
      this.socket.close();
    } else {
      console.error("WebSocket connection is not established.");
    }
  }

  private reconnect(): void {
    if (this.reconnectInterval) return;
    this.reconnectInterval = setInterval(() => {
      this.connect();
    }, 7000);
  }

  public stopReconnect(): void {
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
    }
  }
}

export default WebSocketService;
