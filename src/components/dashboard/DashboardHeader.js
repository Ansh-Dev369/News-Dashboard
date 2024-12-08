const DashboardHeader = ({ children }) => {
  return (
    <header className="flex  top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
      {children}
    </header>
  );
};

export default DashboardHeader;
