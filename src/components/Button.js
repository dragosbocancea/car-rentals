"use client";

const Button = ({ onClick = () => {}, children, disabled = false }) => {
  return (
    <div
      role="button"
      aria-pressed="false"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={!disabled ? onClick : undefined}
      className={`px-4 py-2 rounded 
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-purple-500 text-white cursor-pointer hover:bg-purple-600"
        }
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75
      `}
    >
      {children}
    </div>
  );
};

export default Button;
