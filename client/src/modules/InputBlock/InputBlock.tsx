import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/send";
import { useRef, useState } from "react";
import { IMessageRequest } from "../../types/chat.types";

import styles from "./styles.module.css";
import { useApp } from "../../store/appSlice";
import { useWebSocket } from "../../hooks/useWebSocket";

function InputBlock() {
  const [isSendLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { sendMessage: sendMessageBySocket } = useWebSocket();
  const { userName, saveMessage } = useApp();

  const handleSendClick = () => {
    sendMessage();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey && inputValue.trim()) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      const currentDateTime = new Date().toISOString();
      const messageData: IMessageRequest = {
        message: inputValue,
        timestamp: currentDateTime,
        sender: userName,
      };

      saveMessage({ ...messageData, error: false, isLoading: false });
      sendMessageBySocket(messageData);
      setInputValue("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <TextField
        id="send-input-message"
        multiline
        maxRows={5}
        fullWidth
        size="small"
        value={inputValue}
        disabled={!userName}
        onChange={handleInputChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              borderColor: "var(--clr-outline)",
            },
            color: "var(--clr-on-surface)",
          },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: "var(--clr-on-surface)",
            },
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderColor: "var(--clr-primary)",
            },
          },
          "& .MuiOutlinedInput-root.Mui-disabled": {
            "& > fieldset": {
              borderColor: "var(--clr-outline)",
            },
          },
        }}
        onKeyDown={handleKeyPress}
      />
      <IconButton
        onClick={handleSendClick}
        disabled={!inputValue || isSendLoading || !userName}
        ref={buttonRef}
      >
        <SendIcon
          sx={{
            color:
              !inputValue || isSendLoading || !userName
                ? "var(--clr-outline)"
                : "var(--clr-primary)",
          }}
        />
      </IconButton>
    </div>
  );
}

export { InputBlock };
