import { LoaderOne } from "@/components/ui/loader";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { createFormAction } from "@/store/actions/formAction";
import { Ban } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormCreator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const createNewForm = async () => {
      if (!user?.email) return;
      try {
        const resultAction = await dispatch(
          createFormAction({
            email: user.email,
            formData: {
              title: "Untitled Form",
              description: "",
            },
          })
        );

        if (createFormAction.fulfilled.match(resultAction)) {
          const newFormId = resultAction.payload.data.id;
          navigate(`/create-form/${newFormId}`, { replace: true });
        } else {
          setError(true);
        }
      } catch (err) {
        console.log("Create new form catch error:", err);

        setError(true);
      }
    };

    createNewForm();
  }, [dispatch, navigate, user?.email]);

  if (error) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="flex items-center space-x-2 text-destructive">
          <Ban className="animate-pulse" />
          <span>Something went wrong! Please try again.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <LoaderOne />
    </div>
  );
};

export default FormCreator;
