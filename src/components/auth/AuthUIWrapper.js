const AuthUIWrapper = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full max-w-xs md:max-w-md p-6 bg-white rounded-lg shadow-2xl flex flex-col gap-7">
        {children}
      </form>
    </div>
  );
};

export default AuthUIWrapper;
