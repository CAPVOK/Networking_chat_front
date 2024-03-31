import "./Palette.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeModeProvider } from "./provides/ThemeModeProvider";
import routes from "./routes";
import { WebSocketProvider } from "./provides/WebSocketProvider";

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
