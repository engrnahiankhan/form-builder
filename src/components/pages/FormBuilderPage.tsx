"use client";

import type React from "react";

import { Eye, PlusCircle, Trash2, Users, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "../ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  changeFormValueAction,
  setSingleFormData,
  changeQuestionValue,
  changeOptionValue,
  addBlankOption,
  deleteQuestion,
  deleteOption,
  addBlankQuestion,
} from "@/store/slices/formSlice";
import { updateFormAction } from "@/store/actions/formAction";
import { Switch } from "../ui/switch";

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

  const [activeSection, setActiveSection] = useState<"title" | string | number>(
    "title"
  );
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const prevQuestionCount = useRef(data?.questions?.length || 0);

  useEffect(() => {
    if (paramsId && formsData.data.length) {
      dispatch(setSingleFormData(paramsId));
    }
  }, [paramsId, formsData.data, dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (data && user?.email) {
        dispatch(
          updateFormAction({ email: user.email, id: data.id, formData: data })
        );
      }
    }, 600);
    return () => {
      clearTimeout(handler);
    };
  }, [data, user?.email, dispatch]);

  useEffect(() => {
    if (data?.questions) {
      const currentQuestionCount = data.questions.length;
      if (currentQuestionCount > prevQuestionCount.current) {
        const lastQuestion = data.questions[currentQuestionCount - 1];
        const lastQuestionRef = questionRefs.current[String(lastQuestion.id)];
        if (lastQuestionRef) {
          lastQuestionRef.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          setActiveSection(lastQuestion.id);
        }
      }
      prevQuestionCount.current = currentQuestionCount;
    }
  }, [data?.questions]);

  const handleTitleClick = () => {
    setActiveSection("title");
  };

  const handleQuestionClick = (questionId: string | number) => {
    setActiveSection(questionId);
  };

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

  const handleDeleteQuestion = (id: number | string) => {
    dispatch(deleteQuestion({ questionId: id }));
  };

  const handleOpenPreview = () => {
    window.open(`/create-form/${paramsId}/preview`, "_blank");
  };

  const Toolbar = () => (
    <div className="flex justify-center w-[10%]">
      <Button
        onClick={() => dispatch(addBlankQuestion())}
        size="default"
        variant="brutalist">
        <PlusCircle className="w-5 h-5" />
      </Button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <Card className="p-4 w-full">
          <CardTitle className="flex items-center justify-between">
            Create Form
            <div className="flex items-center space-x-3">
              <Button onClick={handleOpenPreview} variant="minimal">
                <Eye />
                Preview
              </Button>
              <Button variant="soft">
                <Users />
                Publish
              </Button>
            </div>
          </CardTitle>
        </Card>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-[90%]">
              <Card
                className="p-6 w-full border-l-8 border-l-green-600 hover:shadow-md transition-shadow"
                onClick={handleTitleClick}>
                <div className="flex flex-col space-y-4">
                  <Input
                    value={data?.title}
                    onChange={handleTitleChange}
                    placeholder="Untitled form"
                    className="outline-0 border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-b-2 transition-all !text-2xl font-semibold"
                  />
                  <Textarea
                    value={data?.description}
                    onChange={handleDescriptionChange}
                    placeholder="Form Description"
                    className="min-h-[20px] outline-0 border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-b-2 transition-all font-medium !text-xl"
                  />
                </div>
              </Card>
            </div>
            {activeSection === "title" && <Toolbar />}
          </div>

          {data &&
            data.questions?.map((que) => (
              <div
                key={que.id}
                className="flex items-start"
                ref={(el) => {
                  questionRefs.current[String(que.id)] = el ?? null;
                }}>
                <div className="w-[90%]">
                  <Card
                    className="p-6 w-full border-l-8 border-l-primary hover:shadow-md transition-shadow"
                    onClick={() => handleQuestionClick(que.id)}>
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
                        className="outline-0 border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-b-2 transition-all !text-base font-semibold"
                      />

                      <RadioGroup
                        defaultValue="comfortable"
                        disabled={!is_preview}>
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
                              className="outline-0 border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-b-2 transition-all font-medium"
                            />

                            {que.options.length > 1 && (
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
                          <div className="flex items-center space-x-2 border py-2 px-4 rounded-lg">
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
                            onClick={() => handleDeleteQuestion(que.id)}
                            size="icon"
                            variant="destructive">
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                {activeSection === que.id && <Toolbar />}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FormBuilderPage;
