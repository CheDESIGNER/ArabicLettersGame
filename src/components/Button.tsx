import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      // Removed the default bg classes so that parent's classes are applied last.
      className={`text-white rounded-md px-4 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};
