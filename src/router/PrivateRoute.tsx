import { LoaderOne } from "@/components/ui/loader";
import { useAppSelector } from "@/hooks/storeHooks";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, authInitialized } = useAppSelector((state) => state.user);

  if (!authInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderOne />
      </div>
    );
  }
  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
