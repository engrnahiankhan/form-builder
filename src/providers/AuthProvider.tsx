import React, { useEffect, ReactNode } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "@/config/firebase.config";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setAuthInitialized, setUser } from "@/store/slices/userSlice";

const auth = getAuth(app);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
      dispatch(setAuthInitialized());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};
