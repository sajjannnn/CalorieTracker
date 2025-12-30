import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import RecipeGpt from "./RecipeGpt";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/recipe",
      element: <RecipeGpt/>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
