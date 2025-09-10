const Title = ({ children, className = "" }) => {
  return (
    <h1
      className={`text-lg text-white sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 uppercase tracking-wider font-minercraftory ${className}`}
      style={{ textShadow: "0 2px 8px #000" }}
    >
      {children}
    </h1>
  );
};

export default Title;
