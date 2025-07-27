import { useParams } from "react-router-dom";
import CreateForm from "../feature/create-form/CreateForm";
import { useAppDispatch } from "@/hooks/storeHooks";
import { useEffect } from "react";
import { getFormByIdAction } from "@/store/actions/formAction";

const FormBuilderPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch(getFormByIdAction(params.id));
    }
  }, [params.id, dispatch]);
  return (
    <div className="max-w-4xl mx-auto">
      <CreateForm />
    </div>
  );
};

export default FormBuilderPage;
