import CLoader from "@/components/shared/CLoader";
import CMessage from "@/components/shared/CMessage";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { updateFormAction } from "@/store/actions/formAction";
import {
  changeFormValueAction,
  setSingleFormData,
} from "@/store/slices/formSlice";

import { Eye } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CreateForm = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const paramsId = Number(params.id);
  const {
    formsData,
    updateForm,
    singleFormData: { data, isError, isLoading, message },
  } = useAppSelector((state) => state.form);

  useEffect(() => {
    if (paramsId && formsData.data.length) {
      dispatch(setSingleFormData(paramsId));
    }
  }, [paramsId, formsData.data, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(updateFormAction({ id: data.id, formData: data }));
    }
  }, [data, dispatch]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFormValueAction({ id: paramsId, title: e.target.value }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(
      changeFormValueAction({ id: paramsId, description: e.target.value })
    );
  };

  if (
    (formsData.isLoading && formsData.data.length === 0) ||
    (data === null && isLoading)
  ) {
    return <CLoader />;
  }

  if (formsData.isError || isError) {
    return (
      <CMessage
        variant="error"
        message={
          formsData.isError
            ? `${formsData.message}`
            : isError
            ? `${message}`
            : "Currently data not available"
        }
      />
    );
  }

  return (
    <>
      <Card className="p-4 mb-4">
        <CardTitle className="flex items-center justify-between">
          Create Form
          {updateForm.isLoading ? (
            <CLoader
              title="Saving..."
              textColor="text-gray-600"
              textSize="text-[12px]"
              iconColor="text-green-600"
              iconSize="w-4 h-4"
            />
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
        {data && (
          <div className="flex flex-col space-y-2 mt-4">
            <Input
              value={data.title}
              onChange={handleTitleChange}
              placeholder="Form Title"
            />
            <textarea
              value={data.description}
              onChange={handleDescriptionChange}
              placeholder="Form Description"
              className="min-h-[100px] p-2 border rounded-md"
            />
          </div>
        )}
      </Card>
    </>
  );
};

export default CreateForm;
