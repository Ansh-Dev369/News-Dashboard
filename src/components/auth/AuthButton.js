import React from "react";

const AuthButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 bg-blue-800 hover:bg-blue-900 transition-colors duration-300 text-white text-lg rounded-md"
    >
      Continue
    </button>
  );
};

export default AuthButton;
