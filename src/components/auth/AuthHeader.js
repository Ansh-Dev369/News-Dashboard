const AuthHeader = ({ type }) => {
  const login = type === "login";
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-3xl font-bold">{login ? "Login" : "Signup"}</p>
      <p className="text-lg text-gray-700 font-medium">to get started</p>
    </div>
  );
};

export default AuthHeader;
