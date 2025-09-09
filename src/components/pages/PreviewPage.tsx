"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Asterisk } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { changeOptionValue, setSingleFormData } from "@/store/slices/formSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { LoaderOne } from "../ui/loader";

const PreviewPage = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const paramsId = Number(params.id);
  const {
    formsData,
    singleFormData: { data, isLoading },
  } = useAppSelector((state) => state.form);

  useEffect(() => {
    if (paramsId && formsData.data.length) {
      dispatch(setSingleFormData(paramsId));
    }
  }, [paramsId, formsData.data, dispatch]);

  const clearAllFormData = () => {
    if (data && data.questions) {
      data.questions.forEach((question) => {
        question.options.forEach((option) => {
          if (option.isCorrect) {
            dispatch(
              changeOptionValue({
                questionId: question.id,
                optionId: option.id,
                field: "isCorrect",
                value: false,
              })
            );
          }
        });
      });
    }
  };

  if (formsData.isLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderOne />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col space-y-6 w-full">
        <Card className="p-6 w-full border-l-8 border-l-green-600">
          <div className="flex flex-col space-y-4">
            <Label className="text-2xl font-semibold">{data?.title}</Label>
            {data?.description !== "" && (
              <Label className="font-medium text-xl">{data?.description}</Label>
            )}
          </div>
        </Card>

        {/* Question section  */}
        {data &&
          data.questions?.map((que) => (
            <Card
              key={que.id}
              className="p-6 w-full border-l-8 border-l-primary transition-[height] duration-500 ease-in-out overflow-hidden">
              <div className="space-y-6 transition-all duration-500 ease-in-out">
                <div className="flex items-baseline">
                  <Label className="text-base font-semibold">{que.text}</Label>
                  {que.required && (
                    <Asterisk size={14} className="text-destructive" />
                  )}
                </div>

                <RadioGroup defaultValue="comfortable">
                  {que.options.map((opt) => (
                    <div
                      key={opt.id}
                      className="flex items-center gap-3 hover:text-primary transition-all"
                      onClick={() => {
                        if (opt.isCorrect) {
                          // If this option is already selected, deselect it
                          dispatch(
                            changeOptionValue({
                              questionId: que.id,
                              optionId: opt.id,
                              field: "isCorrect",
                              value: false,
                            })
                          );
                        } else {
                          // If this option is not selected, first deselect all options in this question
                          que.options.forEach((option) => {
                            if (option.isCorrect) {
                              dispatch(
                                changeOptionValue({
                                  questionId: que.id,
                                  optionId: option.id,
                                  field: "isCorrect",
                                  value: false,
                                })
                              );
                            }
                          });
                          // Then select the clicked option
                          dispatch(
                            changeOptionValue({
                              questionId: que.id,
                              optionId: opt.id,
                              field: "isCorrect",
                              value: true,
                            })
                          );
                        }
                      }}>
                      <RadioGroupItem
                        value={String(opt.id)}
                        id={String(opt.id)}
                        checked={opt.isCorrect}
                      />

                      <Label className="font-medium">{opt.text}</Label>
                    </div>
                  ))}
                </RadioGroup>

                {que.options.some((opt) => opt.isCorrect) && (
                  <div className="flex justify-end animate-in fade-in-0 slide-in-from-top-1 duration-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Clear all selections for this question
                        que.options.forEach((option) => {
                          if (option.isCorrect) {
                            dispatch(
                              changeOptionValue({
                                questionId: que.id,
                                optionId: option.id,
                                field: "isCorrect",
                                value: false,
                              })
                            );
                          }
                        });
                      }}>
                      Clear selection
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}

        <Card className="w-full p-3 flex flex-row items-center justify-between">
          <Button disabled variant="default">
            Submit
          </Button>
          <Button variant="soft" onClick={clearAllFormData}>
            Clear form
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PreviewPage;
