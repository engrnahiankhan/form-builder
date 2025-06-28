import { useDispatch } from "react-redux";
import { setClick } from "../../store/slices/inSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Signup page</h1>

      <button onClick={() => dispatch(setClick(true))}>Sign In</button>
    </div>
  );
};

export default SignupPage;
