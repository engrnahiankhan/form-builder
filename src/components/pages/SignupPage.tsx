import { useDispatch } from "react-redux";
import { setClick } from "../../store/slices/inSlice";
import { Button } from "../ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const SignupPage = () => {
  const dispatch = useDispatch();

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
              Create Account
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Join thousands of users managing their data efficiently
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input type="text" placeholder="Enter your full name" />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <Label>Email Address</Label>
              <Input type="email" placeholder="Enter your email address" />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input type="password" placeholder="Enter your strong password" />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full py-5"
              onClick={() => dispatch(setClick(true))}>
              <span>Signup</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
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
