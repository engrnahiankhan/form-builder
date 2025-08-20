import { useAppSelector } from "@/hooks/storeHooks";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAppSelector((state) => state.user);
  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
