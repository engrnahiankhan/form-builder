import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setClick } from "@/store/slices/inSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Card className="min-h-[300px]"></Card>
      <Button
        variant="destructive"
        size="lg"
        onClick={() => dispatch(setClick(false))}>
        Sign Out
      </Button>
    </div>
  );
};

export default Dashboard;
