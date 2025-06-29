import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/storeHooks";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isClick = useAppSelector((state) => state.test.is_click);
  return isClick ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
