import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PrivateLayout from "../components/layout/PrivateLayout";
import SignupPage from "../components/pages/SignupPage";
import SigninPage from "@/components/pages/SigninPage";
import PublicErrorPage from "@/components/pages/PublicErrorPage";
import FormBuilderPage from "@/components/pages/FormBuilderPage";
import DashboardPage from "@/components/pages/DashboardPage";
import FormCreator from "@/components/feature/create-form/FormCreator";
import PreviewPage from "@/components/pages/PreviewPage";

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
          element: <DashboardPage />,
        },
        {
          path: "/create-form",
          element: <FormCreator />,
        },
        {
          path: "/create-form/:id",
          element: <FormBuilderPage />,
        },
        {
          path: "/create-form/:id/preview",
          element: <PreviewPage />,
        },
      ],

      errorElement: <PublicErrorPage />,
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      ),
    },
    {
      path: "/signin",
      element: (
        <PublicRoute>
          <SigninPage />
        </PublicRoute>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Index;
