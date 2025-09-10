import logoMine from "../../assets/logo-minecraft.png";

const Header = () => {
  return (
    <header className="bg-[rgb(30,30,30)] h-12 sm:h-16 relative z-20">
      <div className="flex justify-center absolute w-full -bottom-2 sm:-bottom-3">
        <img className="w-40 sm:w-56 md:w-64" src={logoMine} alt="" />
      </div>
    </header>
  );
};

export default Header;