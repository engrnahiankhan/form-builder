import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RecentForm from "./RecentForm";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <Card className="min-h-[300px] bg-slate-100">
        <CardTitle>Start a new form</CardTitle>

        <div className="flex flex-col justify-center items-center">
          <Button
            onClick={() => navigate("/create-form")}
            variant="outline"
            className="size-40">
            <Plus className="size-20 text-destructive" />
          </Button>
          <span className="font-semibold mt-2 text-gray-700">Blank Form</span>
        </div>
      </Card>

      <Card className="min-h-[300px]">
        <CardTitle>Recent forms</CardTitle>
        <RecentForm />
      </Card>
    </div>
  );
};

export default Dashboard;
