import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setClick } from "@/store/slices/inSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard page</h1>
      <h1 className="text-2xl font-bold">Dashboard page</h1>

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
