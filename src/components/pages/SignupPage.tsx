import { useDispatch } from "react-redux";
import { setClick } from "../../store/slices/inSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Signup page</h1>

      <button
        onClick={() => dispatch(setClick(true))}
        className="py-2 px-4 bg-blue-500 text-white cursor-pointer">
        Sign In
      </button>
    </div>
  );
};

export default SignupPage;
