import React from "react";

export const Button = ({
  label,
  onClick,
}: {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="mt-2 py-1 px-20 bg-[#1877f2] text-xl text-white font-medium font-serif rounded-md"
    >
      {label}
    </button>
  );
};
