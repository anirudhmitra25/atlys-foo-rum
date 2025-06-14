import React, {
  type FC,
  type MouseEvent,
  type ReactNode,
  useEffect,
} from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
  /** Controls visibility of the modal */
  isOpen: boolean;
  /** Callback for closing the modal (UI only) */
  onClose: () => void;
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

interface ModalHeaderProps {
  /** Optional icon (ReactNode) to display on the left */
  icon?: ReactNode;
  /** Main heading text */
  title?: string;
  /** Smaller description text */
  description?: string;
  /** Optional h3 heading text */
  h3?: string;
  /** Optional h3 className */
  h3ClassName?: string;
  /** Callback for the close (X) button */
  onClose?: () => void;
  className?: string;
}

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

const Modal: FC<ModalProps> & {
  Header: FC<ModalHeaderProps>;
  Content: FC<ModalContentProps>;
  Footer: FC<ModalFooterProps>;
} = ({ isOpen, onClose, className = "", children, style }) => {
  useEffect(() => {
    if (isOpen) {
      // More aggressive scroll prevention
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden"; // Prevent html element scrolling too
    }

    return () => {
      // Reset all scroll locks
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent) => {
    // Only close if clicking directly on the overlay background
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000073]"
      onClick={handleOverlayClick}
    >
      {/* Modal Container */}
      <div
        style={style}
        className={`relative max-h-[90vh] overflow-auto rounded-2xl bg-transparent px-6 py-4 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Modal.Header
const ModalHeader: FC<ModalHeaderProps> = ({
  icon,
  title,
  description,
  h3,
  h3ClassName = "",
  onClose,
  className = "",
}) => {
  return (
    <div className={`relative mb-4 flex items-center gap-x-3 ${className}`}>
      {/* Optional Icon */}
      {icon && (
        <div className="w-15 h-15 flex items-center justify-center">{icon}</div>
      )}

      {/* Title & Description */}
      <div className="flex-1">
        {title && (
          <h2 className="text-lg font-bold leading-6 text-[#1A1A1A]">
            {title}
          </h2>
        )}
        {h3 && (
          <h3 className={`mt-1 text-base font-medium ${h3ClassName}`}>{h3}</h3>
        )}
        {description && (
          <p className="mt-1 whitespace-normal text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      {/* Close Button */}
      {onClose && (
        <div className="absolute right-0 -mt-3 h-full items-start">
          <button
            onClick={onClose}
            className="ml-auto transition hover:text-gray-800 text-gray-600"
          >
            <MdClose size={25} />
          </button>
        </div>
      )}
    </div>
  );
};

// Modal.Content
const ModalContent: FC<ModalContentProps> = ({ children, className = "" }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

// Modal.Footer
const ModalFooter: FC<ModalFooterProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
};

// Attach subcomponents to Modal
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
