export interface IMessageProps {
  msg: string;
  isUserMessage: boolean;
  sender: string;
  time: string;
  isError: boolean;
  isLoading: boolean;
}
