import { styled, Typography } from "@mui/material";
import { useMainPage } from "./useMainPage";
import { MessageGroup } from "../../components";
import { InputBlock, NavBar } from "../../modules";

import s from "./styles.module.css";

const StyledText = styled(Typography)(() => ({
  color: "var(--clr-on-surface)",
}));

export const MainPage = () => {
  const {
    messages,
    userName,
    checkIsFirstMessage,
    /* messageQueue, */ chatRef,
  } = useMainPage();

  return (
    <div className={s.page}>
      <div className={s["chat-block"]}>
        <NavBar />
        <div className={s.chat} ref={chatRef}>
          {!userName ? (
            <div className={s.center}>
              <StyledText variant="h6" textAlign="center">
                Войдите в систему
              </StyledText>
            </div>
          ) : (
            <>
              {messages.map((messageData, index) => (
                <MessageGroup
                  key={index}
                  isFirstMessage={checkIsFirstMessage(index)}
                  isUserMessage={userName === messageData.sender}
                  msg={messageData.message}
                  sender={messageData.sender}
                  time={messageData.timestamp}
                  isError={messageData.error}
                  isLoading={messageData.isLoading}
                />
              ))}
              {/*  {messageQueue.map((messageData, index) => (
              <MessageGroup
                key={index}
                isUserMessage={true}
                msg={messageData.message}
                sender={messageData.sender}
                time={messageData.timestamp}
                isError={messageData.error}
                isLoading={true}
              />
            ))} */}
            </>
          )}
        </div>
        <InputBlock />
      </div>
    </div>
  );
};
