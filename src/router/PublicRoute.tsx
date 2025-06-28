import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/storeHooks";
import { Navigate } from "react-router-dom";

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isClick = useAppSelector((state) => state.test.is_click);
  return !isClick ? children : <Navigate to="/" />;
};

export default PublicRoute;
