import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../common/Button";
import { Input, Card } from "../common";
import loginSvg from "../../assets/login.svg";
import {
  validateSignUp,
  type SignUpFormData,
} from "../../helper/validateSignUp";

const SignUp = ({
  onSignUp,
}: {
  onSignUp: (emailOrUsername: string, password: string) => void;
}) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    emailOrUsername: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    emailOrUsername?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [showValidation, setShowValidation] = useState(false);
  const [shakingFields, setShakingFields] = useState<Set<string>>(new Set());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Clear validation error for this field when user starts typing
      if (validationErrors[field as keyof typeof validationErrors]) {
        setValidationErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const triggerShakeAnimation = (fieldName: string) => {
    setShakingFields((prev) => new Set(prev).add(fieldName));
    setTimeout(() => {
      setShakingFields((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fieldName);
        return newSet;
      });
    }, 600); // Animation duration
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = () => {
    const validationResult = validateSignUp(formData);
    setShowValidation(true);

    if (!validationResult.isValid) {
      setValidationErrors(validationResult.errors);

      // Show toast error
      const firstError = Object.values(validationResult.errors)[0];
      toast.error(firstError);

      // Trigger shake animation for invalid fields
      Object.keys(validationResult.errors).forEach((fieldName) => {
        triggerShakeAnimation(fieldName);
      });

      return;
    }

    // Clear any existing errors
    setValidationErrors({});
    setShowValidation(false);

    // Call the parent handler
    onSignUp(formData.emailOrUsername, formData.password);
  };

  const getInputClassName = (fieldName: string) => {
    const baseClasses = "bg-[#F4F4F4] rounded-xl transition-all duration-200";
    const hasError =
      showValidation &&
      validationErrors[fieldName as keyof typeof validationErrors];
    const isShaking = shakingFields.has(fieldName);

    const errorClasses = hasError ? "border-2 border-red-500 bg-red-50" : "";
    const shakeClasses = isShaking ? "animate-shake" : "";

    return `${baseClasses} ${errorClasses} ${shakeClasses}`.trim();
  };

  return (
    <Card className="bg-white p-8 w-full h-full shadow-lg">
      {/* Sign In Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <img src={loginSvg} alt="logo" className="w-6 h-6" />
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="text-center mb-15">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Create an account to continue
        </h1>
        <p className="text-[#0000007A] text-xs">
          Create an account to access all the features on this app{" "}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Email or Username Input */}
        <Input>
          <Input.Label htmlFor="emailOrUsername">Email or username</Input.Label>
          <Input.Field
            id="emailOrUsername"
            name="emailOrUsername"
            type="text"
            value={formData.emailOrUsername}
            onChange={handleInputChange("emailOrUsername")}
            placeholder="Enter your email or username"
            hideBorder={true}
            className={getInputClassName("emailOrUsername")}
          />
          {showValidation && validationErrors.emailOrUsername && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.emailOrUsername}
            </p>
          )}
        </Input>

        {/* Password Input */}
        <Input>
          <Input.Label htmlFor="password">Password</Input.Label>
          <div className="relative">
            <Input.Field
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange("password")}
              placeholder="Enter your password"
              hideBorder={true}
              className={`${getInputClassName("password")} pr-12`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {showPassword ? (
                <FiEyeOff className="w-5 h-5" />
              ) : (
                <FiEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {showValidation && validationErrors.password && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.password}
            </p>
          )}
        </Input>

        <Input>
          <Input.Label htmlFor="confirmPassword">Repeat Password</Input.Label>
          <div className="relative">
            <Input.Field
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              placeholder="Enter your password again"
              hideBorder={true}
              className={`${getInputClassName("confirmPassword")} pr-12`}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {showConfirmPassword ? (
                <FiEyeOff className="w-5 h-5" />
              ) : (
                <FiEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {showValidation && validationErrors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.confirmPassword}
            </p>
          )}
        </Input>

        {/* Sign Up Button */}
        <Button
          type="PRIMARY"
          onClick={handleSignUp}
          onEnter={handleSignUp}
          className="w-full py-3 text-base font-semibold"
        >
          Create Account
        </Button>
      </div>
    </Card>
  );
};

export default SignUp;
