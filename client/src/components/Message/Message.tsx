import { CircularProgress, styled, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { IMessageProps } from "./types";
import { clsx as cx } from "clsx";

const StyledTextTime = styled(Typography)(() => ({
  color: "var(--clr-on-surface)",
  margin: 0,
}));

const StyledTextBody = styled(Typography)(() => ({
  color: "var(--clr-on-primary-container)",
}));

const StyledTextName = styled(Typography)(() => ({
  color: "var(--clr-on-primary-container)",
  margin: 0,
  padding: 0,
  opacity: 0.83,
}));

function Message(props: IMessageProps) {
  const { msg, isUserMessage, sender, time, isError, isLoading } = props;
  const formattedTime = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cx(styles.messageWrapper, {
        [styles.user]: isUserMessage,
        [styles.error]: isError,
      })}
    >
      <div className={styles.textBlockWrapper}>
        {!isUserMessage && (
          <StyledTextName fontSize={14} variant="caption">
            {sender}
          </StyledTextName>
        )}
        <StyledTextBody variant="body1">
          {isError ? "Ошибка" : msg}
        </StyledTextBody>
      </div>
      <div className={styles.infoWrapper}>
        {isLoading ? (
          <CircularProgress size={10} />
        ) : (
          <StyledTextTime variant="caption">{formattedTime}</StyledTextTime>
        )}
      </div>
    </div>
  );
}

export { Message };
