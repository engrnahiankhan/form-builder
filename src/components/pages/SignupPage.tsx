import { Button } from "../ui/button";
import { ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { createNewUser } from "@/store/actions/userAction";
import { toast } from "sonner";

interface SignupFormDataType {
  fullName: string;
  email: string;
  password: string;
}

interface InputErrorStateType {
  fullName?: string;
  email?: string;
  password?: string;
}
const SignupPage = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<SignupFormDataType>({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [inputErrors, setInputErrors] = useState<InputErrorStateType>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setInputErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const { fullName, email, password } = formData;

    const newErrors: InputErrorStateType = {};
    if (!fullName.trim()) newErrors.fullName = "Fullname is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setInputErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const signupPromise = dispatch(createNewUser({ email, password })).unwrap;

    toast.promise(signupPromise, {
      loading: "Creating your account...",
      success: "Account created successfully!",
      error,
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-black/30 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Sign Up Account
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Join thousands of users managing their data efficiently
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {inputErrors.fullName && (
                <Label className="text-destructive">
                  {inputErrors.fullName}
                </Label>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <Label>Email Address</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
              {inputErrors.email && (
                <Label className="text-destructive">{inputErrors.email}</Label>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your strong password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {inputErrors.password && (
                <Label className="text-destructive">
                  {inputErrors.password}
                </Label>
              )}
            </div>

            <Label>
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-primary hover:underline cursor-pointer">
                SignIn
              </Link>
            </Label>

            {/* Submit Button */}
            <Button type="submit" className="w-full py-5">
              <span>SignUp</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <Shield className="w-4 h-4" />
            <span>Your data is protected with enterprise-grade security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
