import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/storeHooks";
import { Navigate } from "react-router-dom";
import { LoaderOne } from "@/components/ui/loader";

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, authInitialized } = useAppSelector((state) => state.user);
  if (!authInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderOne />
      </div>
    );
  }
  return !user ? children : <Navigate to="/" />;
};

export default PublicRoute;
