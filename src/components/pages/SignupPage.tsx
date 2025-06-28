import { useDispatch } from "react-redux";
import { setClick } from "../../store/slices/inSlice";
import { Button } from "../ui/button";

const SignupPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Signup page</h1>

      <Button variant="default" onClick={() => dispatch(setClick(true))}>
        Sign In
      </Button>
    </div>
  );
};

export default SignupPage;
