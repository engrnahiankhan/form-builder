// components/features/FormCreator.tsx
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { createFormAction } from "@/store/actions/formAction";
import { Ban, Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const FormCreator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isError } = useAppSelector((state) => state.form.createForm);

  useEffect(() => {
    const createNewForm = async () => {
      const newId = uuidv4();
      await dispatch(
        createFormAction({
          id: newId,
          title: "Untitled Form",
          description: "",
        })
      );

      navigate(`/create-form/${newId}`, { replace: true });
    };

    createNewForm();
  }, [dispatch, navigate]);

  if (isError) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="flex items-center space-x-2 text-destructive">
          <Ban className="animate-pulse" />
          <span>Something wrong! Please try again.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <Loader className="animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default FormCreator;
