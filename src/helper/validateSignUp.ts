export interface ValidationResult {
  isValid: boolean;
  errors: {
    emailOrUsername?: string;
    password?: string;
    confirmPassword?: string;
  };
}

export interface SignUpFormData {
  emailOrUsername: string;
  password: string;
  confirmPassword: string;
}

export const validateSignUp = (formData: SignUpFormData): ValidationResult => {
  const errors: ValidationResult["errors"] = {};

  // Check if email/username is provided
  if (!formData.emailOrUsername.trim()) {
    errors.emailOrUsername = "Email or username is required";
  }

  // Check if password is provided
  if (!formData.password.trim()) {
    errors.password = "Password is required";
  }

  // Check if confirm password is provided
  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm your password";
  }

  if(formData.password.length<8){
    errors.password = "Password should be greater than 8 characters"
  }

  // Check if passwords match (only if both are provided)
  if (
    formData.password &&
    formData.confirmPassword &&
    formData.password !== formData.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
};
