import CLoader from "@/components/shared/CLoader";
import CMessage from "@/components/shared/CMessage";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { updateFormAction } from "@/store/actions/formAction";
import {
  handleFormDescription,
  handleFormTitle,
} from "@/store/slices/formSlice";
import { Eye, Loader2 } from "lucide-react";
import { ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";

const CreateForm = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { formDataById, updateForm } = useAppSelector((state) => state.form);

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

  // Loading state - show loader when data is null and still loading
  if (formDataById.isLoading && !formDataById.data) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <CLoader />
      </div>
    );
  }

  // Error state - show error message if there's an error
  if (formDataById.isError) {
    return (
      <CMessage
        variant="error"
        message={
          formDataById.message || "Something went wrong, please try again later"
        }
      />
    );
  }

  // If data is still not available after loading is complete
  if (!formDataById.data) {
    return <CMessage variant="info" message="No form data available" />;
  }

  return (
    <>
      <Card className="p-4 mb-4">
        <CardTitle className="flex items-center justify-between">
          Create Form
          {updateForm.isLoading ? (
            <Loader2 color="green" className="animate-spin" />
          ) : (
            updateForm.isError && (
              <CMessage message={updateForm.message || ""} />
            )
          )}
          <Button variant="soft">
            <Eye />
            Preview
          </Button>
        </CardTitle>
      </Card>
      <Card className="p-4">
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
    </>
  );
};

export default CreateForm;
