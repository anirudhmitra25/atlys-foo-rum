import React, { useState, useRef, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ComponentType<any>;
  onClick?: () => void;
}

interface DropdownProps {
  className?: string;
  styles?: React.CSSProperties;
  options: DropdownOption[];
  selectedValue?: string;
  placeholder?: string;
  onSelect?: (option: DropdownOption) => void;
  triggerClassName?: string;
  dropdownClassName?: string;
  showChevron?: boolean;
  disabled?: boolean;
  renderTrigger?: (
    selectedOption: DropdownOption | null,
    isOpen: boolean
  ) => React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  className = "",
  styles = {},
  options = [],
  selectedValue,
  placeholder = "Select option",
  onSelect,
  triggerClassName = "",
  dropdownClassName = "",
  showChevron = true,
  disabled = false,
  renderTrigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((option) => option.value === selectedValue) || null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: DropdownOption) => {
    if (option.onClick) {
      option.onClick();
    }
    if (onSelect) {
      onSelect(option);
    }
    setIsOpen(false);
  };

  const defaultTriggerContent = (
    <div
      className={`flex items-center gap-2 ${
        showChevron ? "justify-between" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        {selectedOption?.icon && (
          <selectedOption.icon className="text-gray-600 text-sm" />
        )}
        <span className="text-sm text-gray-700">
          {selectedOption?.label || placeholder}
        </span>
      </div>
      {showChevron && (
        <BsChevronDown
          className={`text-gray-500 text-xs transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      )}
    </div>
  );

  return (
    <div ref={dropdownRef} className={`relative ${className}`} style={styles}>
      {/* Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          flex items-center px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 
          transition-colors duration-200 cursor-pointer border border-transparent
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${triggerClassName}
        `}
      >
        {renderTrigger
          ? renderTrigger(selectedOption, isOpen)
          : defaultTriggerContent}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
          absolute top-full left-0 mt-1 bg-white border border-gray-200 
          rounded-lg shadow-lg z-50 min-w-full overflow-hidden
          ${dropdownClassName}
        `}
        >
          {options.map((option, index) => (
            <button
              key={option.value || index}
              onClick={() => handleOptionClick(option)}
              className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {option.icon && <option.icon className="text-gray-600 text-sm" />}
              <span className="text-sm text-gray-700">{option.label}</span>
            </button>
          ))}
          {options.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
