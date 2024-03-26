import "./App.css";
import { realRoutes } from "./Routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter(realRoutes);
  return <RouterProvider router={router} />;
}

export default App;
