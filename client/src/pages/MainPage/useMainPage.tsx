import { useEffect, useRef } from "react";
import { useApp } from "../../store/appSlice";

export const useMainPage = () => {
  const chatRef = useRef<HTMLDivElement>(null);

  const { messages, userName } = useApp();

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages /* , messageQueue */]);

  const checkIsFirstMessage = (index: number) => {
    if (index === 0) return true;
    const currentDate = new Date(messages[index].timestamp);
    const prevDate = new Date(messages[index - 1].timestamp);
    console.log(currentDate.toDateString());
    console.log(prevDate.toDateString());
    return currentDate.toDateString() !== prevDate.toDateString();
  };

  return {
    messages,
    userName,
    chatRef,
    checkIsFirstMessage,
    // messageQueue,
  };
};
