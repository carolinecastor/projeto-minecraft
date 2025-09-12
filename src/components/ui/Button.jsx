import { playClickSound } from "../../utils/soundUtils";

const Button = ({
  children,
  disabled = false,
  className = "",
  type = "button",
  onClick,
}) => {
  const buttonClasses =
    "relative cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 uppercase tracking-wider transition-all duration-200 border-t-2 border-b-2 border-t-[rgb(64,240,105)] border-b-green-800 shadow-lg hover:shadow-xl active:translate-y-0.5 active:shadow-md outline-2 outline-black font-minecraft text-sm sm:text-base";

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed hover:bg-current active:translate-y-0"
    : "";

  const handleClick = (e) => {
    if (!disabled) {
      playClickSound();
      if (onClick) {
        onClick(e);
      }
    }
  };

  return (
    <button
      type={type}
      className={`${buttonClasses} ${disabledClasses} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <h6 className="font-minercraftory!">{children}</h6>
    </button>
  );
};

export default Button;
