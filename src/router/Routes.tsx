import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PrivateLayout from "../components/layout/PrivateLayout";
import SignupPage from "../components/pages/SignupPage";
import HomePage from "../components/pages/HomePage";

const Index = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <PrivateLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Index;
