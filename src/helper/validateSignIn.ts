export interface SignInValidationResult {
  isValid: boolean;
  errors: {
    emailOrUsername?: string;
    password?: string;
  };
}

export interface SignInFormData {
  emailOrUsername: string;
  password: string;
}

export const validateSignIn = (
  formData: SignInFormData
): SignInValidationResult => {
  const errors: SignInValidationResult["errors"] = {};

  // Check if email/username is provided
  if (!formData.emailOrUsername.trim()) {
    errors.emailOrUsername = "Email or username is required";
  }

  // Check if password is provided
  if (!formData.password.trim()) {
    errors.password = "Password is required";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
};
