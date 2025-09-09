import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { getAllFormDataAction } from "@/store/actions/formAction";

const useFormsData = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  console.log("check email:", user?.email);

  useEffect(() => {
    if (user?.email) {
      dispatch(getAllFormDataAction(user?.email));
    }
  }, [dispatch, user?.email]);
};

export default useFormsData;
