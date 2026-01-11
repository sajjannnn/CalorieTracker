import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utilis/appStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./components/Contact";
import RecipeGpt from "./components/RecipeGpt";
import Login from "./components/Login";
import AskGpt from "./components/AskGpt";
import AddMeal from "./components/AddMeal";
import Error from "./components/Error";

function AppLayout() {
  return (
    <Provider store={appStore}>
      <>
        <Header />
        <Outlet />
      </>
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/calorie-check",
        element: <AskGpt />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/recipe",
        element: <RecipeGpt />,
      },
      {
        path: "/add-meal",
        element: <AddMeal />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
