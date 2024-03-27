import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeModeProvider } from "./ThemeModeProvider";
import routes from "./routes";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <ThemeModeProvider>
      <RouterProvider router={router} />
    </ThemeModeProvider>
  );
}

export default App;
