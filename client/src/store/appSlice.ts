import { create } from "zustand";
import { IClientMessage } from "../types/chat.types";

export type AppStateType = {
  messages: IClientMessage[];
  userName: string;
};
export type AppActions = {
  saveMessage: (message: IClientMessage) => void;
  clearChat: () => void;
  saveUserName: (name: string) => void;
};

const initialState: AppStateType = {
  messages: [],
  userName: "",
};

export const useApp = create<AppStateType & AppActions>((set) => ({
  ...initialState,
  clearChat: () => set({ messages: initialState.messages }),
  saveMessage: (newMessage) =>
    set((state) => {
      const currentMessageInChat = state.messages.find(
        (msg) => msg.timestamp === newMessage.timestamp
      );
      if (newMessage.error && currentMessageInChat) {
        return {
          messages: state.messages,
        };
      }
      return {
        messages: state.messages
          .filter((msg) => msg.timestamp !== newMessage.timestamp)
          .concat(newMessage),
      };
    }),
  saveUserName: (userName) => set({ userName }),
}));

/* export const saveMessage = (message: IClientMessage) =>
  useAuth.setState((state) => ({
    messages: state.messages
      .filter((msg) => msg.timestamp !== message.timestamp)
      .concat(message),
  })); */
