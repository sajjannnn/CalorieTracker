import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utilis/appStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Contact from "./components/Contact";
import RecipeGpt from "./components/RecipeGpt";
import Login from "./components/Login";
import AskGpt from "./components/AskGpt";

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
    // errorElement: <Error />,
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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/recipe",
        element: <RecipeGpt />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
