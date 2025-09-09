import {
  Asterisk,
  Edit,
  Eye,
  Image,
  PlusCircle,
  Trash2,
  Type,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "../ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  changeFormValueAction,
  setSingleFormData,
  changeQuestionValue,
  changeOptionValue,
  addBlankOption,
  deleteQuestion,
  deleteOption,
  addBlankQuestion,
  setPreviewMode,
} from "@/store/slices/formSlice";
import { updateFormAction } from "@/store/actions/formAction";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const FormBuilderPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const paramsId = Number(params.id);
  const {
    formsData,
    singleFormData: { data },
    is_preview,
  } = useAppSelector((state) => state.form);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (paramsId && formsData.data.length) {
      dispatch(setSingleFormData(paramsId));
    }
  }, [paramsId, formsData.data, dispatch]);

  useEffect(() => {
    if (data && user?.email) {
      dispatch(
        updateFormAction({ email: user.email, id: data.id, formData: data })
      );
    }
  }, [data, user?.email, dispatch]);

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

  const togglePreview = () => {
    if (is_preview === true) {
      dispatch(setPreviewMode(false));
    } else {
      dispatch(setPreviewMode(true));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Headline preview bar  */}
        <Card className="p-4 w-full">
          <CardTitle className="flex items-center justify-between">
            Create Form
            {is_preview === true ? (
              <Button onClick={togglePreview} variant="outline">
                <Edit />
                Back to Edit
              </Button>
            ) : (
              <Button onClick={togglePreview} variant="soft">
                <Eye />
                Preview
              </Button>
            )}
          </CardTitle>
        </Card>

        {is_preview === false ? (
          <div className="flex items-start gap-4">
            <div className="space-y-6 max-w-[93%] w-full">
              {/* Title and desc  */}
              <Card className="p-6 w-full border-l-8 border-l-green-600">
                <div className="flex flex-col space-y-4">
                  <Input
                    value={data?.title}
                    onChange={handleTitleChange}
                    placeholder="Untitled form"
                    className="outline-0 border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-b-2 transition-all"
                  />
                  <Textarea
                    value={data?.description}
                    onChange={handleDescriptionChange}
                    placeholder="Form Description"
                    className="min-h-[20px] outline-0 border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-b-2 transition-all"
                  />
                </div>
              </Card>

              {/* Question section  */}
              {data &&
                data.questions?.map((que) => (
                  <Card
                    key={que.id}
                    className="p-6 w-full border-l-8 border-l-primary">
                    <div className="space-y-8">
                      <Input
                        value={que.text}
                        onChange={(e) =>
                          dispatch(
                            changeQuestionValue({
                              questionId: que.id,
                              field: "text",
                              value: e.target.value,
                            })
                          )
                        }
                        placeholder="Untitled Question"
                        className="outline-0 border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-b-2 transition-all"
                      />

                      <RadioGroup
                        defaultValue="comfortable"
                        disabled={!is_preview}>
                        {que.options.map((opt, optIndex) => (
                          <div key={opt.id} className="flex items-center gap-3">
                            <RadioGroupItem
                              value={String(opt.id)}
                              id={String(opt.id)}
                              checked={opt.isCorrect}
                              onClick={() =>
                                dispatch(
                                  changeOptionValue({
                                    questionId: que.id,
                                    optionId: opt.id,
                                    field: "isCorrect",
                                    value: true,
                                  })
                                )
                              }
                            />

                            <Input
                              value={opt.text}
                              onChange={(e) =>
                                dispatch(
                                  changeOptionValue({
                                    questionId: que.id,
                                    optionId: opt.id,
                                    field: "text",
                                    value: e.target.value,
                                  })
                                )
                              }
                              className="outline-0 border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-b-2 transition-all"
                            />

                            {que.options.length > 1 && optIndex !== 0 && (
                              <Button
                                onClick={() =>
                                  dispatch(
                                    deleteOption({
                                      questionId: que.id,
                                      optionId: opt.id,
                                    })
                                  )
                                }
                                variant="ghost">
                                <X />
                              </Button>
                            )}
                          </div>
                        ))}
                      </RadioGroup>

                      <div className="flex items-center justify-between">
                        <Button
                          onClick={() =>
                            dispatch(addBlankOption({ questionId: que.id }))
                          }>
                          Add Option
                        </Button>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 border p-2 rounded-lg">
                            <span>Required</span>

                            <Switch
                              checked={que.required}
                              onCheckedChange={(checked) =>
                                dispatch(
                                  changeQuestionValue({
                                    questionId: que.id,
                                    field: "required",
                                    value: checked,
                                  })
                                )
                              }
                            />
                          </div>

                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() =>
                              dispatch(deleteQuestion({ questionId: que.id }))
                            }>
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            {/* Toolbar */}
            <Card className="max-w-[7%] w-full bg-primary min-h-fit">
              <div className="flex flex-col items-center gap-6">
                <Button
                  onClick={() => dispatch(addBlankQuestion())}
                  size="icon"
                  variant="outline">
                  <PlusCircle />
                </Button>
                <Button size="icon" variant="outline">
                  <Type />
                </Button>
                <Button size="icon" variant="outline">
                  <Image />
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col space-y-6 w-full">
            <Card className="p-6 w-full border-l-8 border-l-green-600">
              <div className="flex flex-col space-y-4">
                <Label>{data?.title}</Label>
                <Label>{data?.description}</Label>
              </div>
            </Card>

            {/* Question section  */}
            {data &&
              data.questions?.map((que) => (
                <Card
                  key={que.id}
                  className="p-6 w-full border-l-8 border-l-primary">
                  <div className="space-y-8">
                    <div className="flex items-baseline">
                      <Label>{que.text}</Label>
                      {que.required && (
                        <Asterisk size={14} className="text-destructive" />
                      )}
                    </div>

                    <RadioGroup defaultValue="comfortable">
                      {que.options.map((opt) => (
                        <div key={opt.id} className="flex items-center gap-3">
                          <RadioGroupItem
                            value={String(opt.id)}
                            id={String(opt.id)}
                            checked={opt.isCorrect}
                            onClick={() =>
                              dispatch(
                                changeOptionValue({
                                  questionId: que.id,
                                  optionId: opt.id,
                                  field: "isCorrect",
                                  value: true,
                                })
                              )
                            }
                          />

                          <Label>{opt.text}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </Card>
              ))}

            <Card className="w-full p-3 flex flex-row items-center justify-between">
              <Button variant="default">Submit</Button>
              <Button variant="soft">Clear form</Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilderPage;
