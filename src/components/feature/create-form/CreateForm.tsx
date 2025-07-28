import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { updateFormAction } from "@/store/actions/formAction";
import {
  handleFormDescription,
  handleFormTitle,
} from "@/store/slices/formSlice";
import { ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";

const CreateForm = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { formDataById } = useAppSelector((state) => state.form);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!params.id || !formDataById.data) return;
    dispatch(
      handleFormTitle({
        id: params.id,
        title: e.target.value,
      })
    );
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!params.id || !formDataById.data) return;
    dispatch(
      handleFormDescription({
        id: params.id,
        description: e.target.value,
      })
    );
  };

  useEffect(() => {
    if (formDataById.data) {
      dispatch(
        updateFormAction({
          id: formDataById.data.id,
          formData: {
            title: formDataById.data.title,
            description: formDataById.data.description,
          },
        })
      );
    }
  }, [formDataById.data, dispatch]);

  return (
    <Card className="p-4">
      <CardTitle>Create Form</CardTitle>

      {formDataById.data && (
        <div
          key={formDataById.data.id}
          className="flex flex-col space-y-2 mt-4">
          <Input
            value={formDataById.data.title}
            placeholder="Form Title"
            onChange={handleTitleChange}
          />
          <textarea
            value={formDataById.data.description}
            placeholder="Form Description"
            className="min-h-[100px] p-2 border rounded-md"
            onChange={handleDescriptionChange}
          />
        </div>
      )}
    </Card>
  );
};

export default CreateForm;
