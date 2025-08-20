import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/storeHooks";
import { Navigate } from "react-router-dom";

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAppSelector((state) => state.user);
  return !user ? children : <Navigate to="/" />;
};

export default PublicRoute;
