export interface IMessageRequest {
  sender: string;
  timestamp: string;
  message: string;
}

export interface IMessage extends IMessageRequest {
  error: boolean;
}

export interface IClientMessage extends IMessage {
  isLoading: boolean;
}
