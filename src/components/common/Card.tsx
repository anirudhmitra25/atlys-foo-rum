import React, { type FC, type ReactNode } from "react";

// Main Card component props
interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

// Subcomponent props
interface CardImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

interface CardTextProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

// Define the main Card component with compound types
const Card: FC<CardProps> & {
  Image: FC<CardImageProps>;
  Text: FC<CardTextProps>;
  Description: FC<CardDescriptionProps>;
} = ({ children, className = "", onClick, style }) => {
  return (
    <div
      className={`rounded-2xl shadow-sm ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

// Card.Image subcomponent
const CardImage: FC<CardImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`w-full rounded-lg object-contain ${className}`}
    />
  );
};

// Card.Text subcomponent
const CardText: FC<CardTextProps> = ({ children, className = "", style }) => {
  return (
    <div className={`${className}`} style={style}>
      {children}
    </div>
  );
};

// Card.Description subcomponent
const CardDescription: FC<CardDescriptionProps> = ({
  children,
  className = "",
}) => {
  return (
    <p className={`mt-1 text-xs text-gray-600 ${className}`}>{children}</p>
  );
};

// Attach subcomponents to Card
Card.Image = CardImage;
Card.Text = CardText;
Card.Description = CardDescription;

export default Card;
