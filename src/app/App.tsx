import "./App.css";
import { realRoutes } from "./Routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";

function App() {
  const router = createBrowserRouter(realRoutes);
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
