import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <main className="overflow-hidden">
      <Outlet />
    </main>
  );
};

export default PrivateLayout;
