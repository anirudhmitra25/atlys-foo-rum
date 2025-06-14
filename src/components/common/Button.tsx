import React, { type FC, type ReactNode } from "react";

const BUTTON_TYPES = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY", // clear
  TERTIARY: "TERTIARY",
};

interface ButtonProps {
  children: ReactNode;
  type?: keyof typeof BUTTON_TYPES;
  onClick?: () => void;
  onEnter?: () => void;
  className?: string;
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset";
}

interface ButtonIconProps {
  children: ReactNode;
  position?: "left" | "right";
  className?: string;
}

interface ButtonTextProps {
  children: ReactNode;
  className?: string;
}

// Main Button component
const Button: FC<ButtonProps> & {
  Icon: FC<ButtonIconProps>;
  Text: FC<ButtonTextProps>;
} = ({
  children,
  type = "PRIMARY",
  onClick,
  onEnter,
  className = "",
  disabled = false,
  htmlType = "button",
}) => {
  const getButtonClass = () => {
    switch (type) {
      case BUTTON_TYPES.PRIMARY:
        return "bg-[#5057EA] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors";
      case BUTTON_TYPES.SECONDARY:
        return "bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-xl border border-gray-300 transition-colors";
      case BUTTON_TYPES.TERTIARY:
        return "bg-transparent hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-xl transition-colors";
      default:
        return "bg-transparent hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-xl transition-colors";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !disabled && onEnter) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <button
      type={htmlType}
      className={`${getButtonClass()} ${className} ${
        disabled ? "cursor-not-allowed opacity-30" : "cursor-pointer"
      }`}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Subcomponent for Button Icon
const ButtonIcon: FC<ButtonIconProps> = ({
  children,
  position = "left",
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center ${
        position === "left" ? "mr-2" : "ml-2"
      } ${className}`}
    >
      {children}
    </span>
  );
};

// Subcomponent for Button Text
const ButtonText: FC<ButtonTextProps> = ({ children, className = "" }) => {
  return (
    <span className={`inline-block text-sm font-semibold ${className}`}>
      {children}
    </span>
  );
};

// Attach subcomponents to Button
Button.Icon = ButtonIcon;
Button.Text = ButtonText;

export default Button;
