import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/",
      element : <Home/>
    }
  ])
  return (
    <div>
     <RouterProvider router={appRouter}/>
    </div>
  );
};

export default Body;
