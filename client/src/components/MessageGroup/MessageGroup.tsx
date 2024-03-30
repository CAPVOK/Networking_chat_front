import { Typography } from "@mui/material";
import { IMessageGroupProps } from "./types";
import { Message } from "../Message/Message";
import styles from "./styles.module.css";

const MessageGroup: React.FC<IMessageGroupProps> = (props) => {
  const { isFirstMessage, ...messageProps } = props;

  return (
    <>
      {isFirstMessage && (
        <div className={styles["date-divider"]}>
          <Typography variant="caption" sx={{color: 'var(--clr-on-surface)'}}>
            {new Date(props.time).toLocaleDateString()}
          </Typography>
        </div>
      )}
      <Message {...messageProps} />
    </>
  );
};

export { MessageGroup };
