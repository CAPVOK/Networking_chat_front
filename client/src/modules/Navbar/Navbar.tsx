import {
  Button as MUIButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useWebSocket } from "../../hooks/useWebSocket";
import { useApp } from "../../store/appSlice";
import { useTheme } from "../../hooks/useTheme";

import styles from "./styles.module.css";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import { ThemeModeSwitch } from "../../components";

const StyledButton = styled(MUIButton)(({ color = "primary" }) => ({
  color: "var(--clr-on-surface)",
  borderColor: "var(--clr-on-surface)",
  ":hover": {
    color: `var(--clr-${color})`,
    backgroundColor: "var(--clr-surface-container-high)",
    borderColor: `var(--clr-${color})`,
  },
}));

const StyledText = styled(Typography)(() => ({
  margin: 0,
  color: "var(--clr-on-surface)",
}));

function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { saveUserName, clearChat, userName } = useApp();
  const { toggleTheme, themeMode } = useTheme();

  const { webSocketService } = useWebSocket();

  useEffect(() => {
    const user = localStorage.getItem("userName");
    if (!user) return;
    saveUserName(user);
    createConnection();

    return () => {
      webSocketService.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createConnection = () => {
    webSocketService.connect();
  };

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("userName");
    saveUserName("");
    clearChat();
    webSocketService.disconnect();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const login = (name: string) => {
    if (!name) return;
    localStorage.setItem("userName", name);
    saveUserName(name);
    createConnection();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles["image-wrapper"]}>
          <LogoIcon fill="" />
        </div>
        <div className={styles["buttons-wrapper"]}>
          {userName ? (
            <>
              <StyledText>{userName}</StyledText>
              <StyledButton
                color="error"
                variant="outlined"
                onClick={handleLogoutClick}
              >
                Выйти
              </StyledButton>
            </>
          ) : (
            <StyledButton
              color="primary"
              variant="outlined"
              onClick={handleLoginClick}
            >
              Войти
            </StyledButton>
          )}
          {/*  <ThemeModeSwitch
            setValue={handleChangeMode}
            value={isCurrentThemeLight}
          /> */}
          <ThemeModeSwitch toggleTheme={toggleTheme} theme={themeMode} />
        </div>
      </div>
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.login;
            login(name.toString());
            handleModalClose();
          },
        }}
      >
        <DialogTitle>Вход в систему</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите свой логин</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="login"
            label="Логин"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <MUIButton onClick={handleModalClose}>Отменить</MUIButton>
          <MUIButton type="submit">Войти</MUIButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export { NavBar };
