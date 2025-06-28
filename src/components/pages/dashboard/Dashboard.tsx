import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setClick } from "@/store/slices/inSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Dashboard page</h1>

      <Button variant="destructive" onClick={() => dispatch(setClick(false))}>
        Sign Out
      </Button>
    </div>
  );
};

export default Dashboard;
