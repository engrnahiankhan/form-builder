import { useEffect } from "react";
import { useAppDispatch } from "./storeHooks";
import { getAllFormDataAction } from "@/store/actions/formAction";

const useFormsData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFormDataAction());
  }, [dispatch]);
};

export default useFormsData;
