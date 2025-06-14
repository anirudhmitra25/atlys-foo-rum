import React, { type FC, type ReactNode } from "react";

/**
 * Parent Input component – acts as a wrapper.
 */
interface InputProps {
  children: ReactNode;
  className?: string;
}

interface InputLabelProps {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

interface InputFieldProps {
  id?: string;
  name?: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  submitted?: boolean;
  placeholder_icon?: ReactNode;
  className?: string;
  maxLength?: number;
  hideBorder?: boolean;
  disabled?: boolean;
}

// The main Input component
const Input: FC<InputProps> & {
  Label: FC<InputLabelProps>;
  Field: FC<InputFieldProps>;
} = ({ children, className = "" }) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

/**
 * Input.Field – renders the actual input element.
 */
const InputField: FC<InputFieldProps> = ({
  id,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur = () => {},
  onClick = () => {},
  onKeyDown = () => {},
  required = false,
  submitted = false,
  placeholder_icon,
  className = "",
  maxLength,
  hideBorder = false,
  disabled = false,
}) => {
  const showError = submitted && required && !String(value).trim();

  return (
    <div
      onClick={onClick}
      className={`relative z-0 flex-[0.5] ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${showError ? "mb-2 text-red-600" : "text-gray-600"} ${className}`}
    >
      <input
        id={id}
        type={type}
        disabled={disabled}
        className={`block w-full px-3 py-2 rounded-lg border ${
          hideBorder
            ? "border-none"
            : showError
            ? "border-red-500 focus:border-red-600"
            : "border-gray-300 hover:border-gray-400"
        } focus:outline-none transition-colors`}
        placeholder={placeholder}
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
      />
      {placeholder && (
        <label htmlFor={name} className="sr-only">
          <div className="flex items-center">
            {placeholder_icon && (
              <div className="mr-2 w-3 h-3 flex items-center justify-center">
                {placeholder_icon}
              </div>
            )}
            <span className={`${showError ? "text-red-600" : "text-gray-600"}`}>
              {placeholder}
              {required ? <span>*</span> : ""}
            </span>
          </div>
        </label>
      )}
      {showError && (
        <span className="absolute -bottom-6 left-2 mb-2 text-xs text-red-600">
          This field cannot be empty
        </span>
      )}
    </div>
  );
};

/**
 * Input.Label – renders a floating label above the input.
 * This label appears only if the text is provided.
 */
const InputLabel: FC<InputLabelProps> = ({
  htmlFor,
  children,
  className = "",
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1 text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
};

// Attach subcomponents to Input so they can be used as Input.Label and Input.Field
Input.Label = InputLabel;
Input.Field = InputField;

export default Input;
