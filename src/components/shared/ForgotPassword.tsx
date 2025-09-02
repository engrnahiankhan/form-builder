import { useState, ChangeEvent } from "react";
import Modal from "../ui/modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { toast } from "sonner";
import { resetPassword } from "@/store/actions/userAction";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EmailState {
  value: string;
  error: string;
}

const ForgotPassword = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState<EmailState>({ value: "", error: "" });

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Invalid email address";
    return "";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail({ value: e.target.value, error: "" });
  };

  const handleReset = async () => {
    const errorMessage = validateEmail(email.value);

    if (errorMessage) {
      setEmail((prev) => ({ ...prev, error: errorMessage }));
      return;
    }

    try {
      const resetPromise = dispatch(resetPassword(email.value)).unwrap();

      toast.promise(resetPromise, {
        loading: "Sending reset password email...",
        success: "Reset password email sent successfully!",
        error,
      });

      await resetPromise;

      setEmail({ value: "", error: "" });
      onClose();
    } catch (error) {
      console.error("Reset password failed:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="py-4 space-y-2">
        <h1 className="font-semibold text-lg">Forgot Password</h1>

        <div className="flex items-center space-x-2">
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email.value}
            onChange={handleInputChange}
          />
          <Button
            disabled={loading}
            variant="outline"
            className="py-5"
            onClick={handleReset}>
            Reset
          </Button>
        </div>

        {email.error && (
          <Label className="text-destructive">{email.error}</Label>
        )}
      </div>
    </Modal>
  );
};

export default ForgotPassword;
