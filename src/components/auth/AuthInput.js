export default function AuthInput({
  label,
  className,
  isLoading,
  type,
  ...inputProps
}) {
  let autoComplete;
  if (type === "email") {
    autoComplete = "email";
  } else if (type === "password") {
    autoComplete = "password";
  }
  return (
    <input
      className={`${
        className ?? ""
      } w-full rounded border border-neutral-500 bg-white px-4 py-2 text-lg leading-snug text-neutral-700 focus:bg-white focus:outline-sky-600 ${
        isLoading ? "cursor-not-allowed hover:opacity-70" : ""
      }`}
      tabIndex={0}
      type={type}
      autoComplete={autoComplete}
      name={inputProps.name || type}
      disabled={inputProps.disabled}
      {...inputProps}
    />
  );
}
