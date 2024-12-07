import React from "react";

const AuthButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 bg-[#0016DF] text-white text-lg rounded-md"
    >
      Continue
    </button>
  );
};

export default AuthButton;
