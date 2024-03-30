import "./Palette.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeModeProvider } from "./ThemeModeProvider";
import routes from "./routes";
import { WebSocketProvider } from "./WebSocketProvider";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <ThemeModeProvider>
      <WebSocketProvider>
        <RouterProvider router={router} />
      </WebSocketProvider>
    </ThemeModeProvider>
  );
}

export default App;
