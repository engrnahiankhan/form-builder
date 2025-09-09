import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Asterisk } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { changeOptionValue, setSingleFormData } from "@/store/slices/formSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const PreviewPage = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const paramsId = Number(params.id);
  const {
    formsData,
    singleFormData: { data },
  } = useAppSelector((state) => state.form);

  useEffect(() => {
    if (paramsId && formsData.data.length) {
      dispatch(setSingleFormData(paramsId));
    }
  }, [paramsId, formsData.data, dispatch]);

  return (
    <div className="max-w-4xl mx-auto">
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
          <Button disabled variant="default">
            Submit
          </Button>
          <Button variant="soft">Clear form</Button>
        </Card>
      </div>
    </div>
  );
};

export default PreviewPage;
