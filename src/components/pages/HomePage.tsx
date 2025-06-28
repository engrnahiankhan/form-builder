import { useAppDispatch } from "../../hooks/storeHooks";
import { setClick } from "../../store/slices/inSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Home page</h1>

      <button onClick={() => dispatch(setClick(false))}>Sign Out</button>
    </div>
  );
};

export default HomePage;
