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
  saveMessage: (message) =>
    set((state) => ({
      messages: state.messages
        .filter((msg) => msg.timestamp !== message.timestamp)
        .concat(message),
    })),
  saveUserName: (userName) => set({ userName }),
}));

/* export const saveMessage = (message: IClientMessage) =>
  useAuth.setState((state) => ({
    messages: state.messages
      .filter((msg) => msg.timestamp !== message.timestamp)
      .concat(message),
  })); */
