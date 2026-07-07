const CustomButton = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-semibold hover:bg-[#4F46E5] transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;