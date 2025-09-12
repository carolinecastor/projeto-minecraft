import transition from "../../assets/transition.png";

const Transition1 = ({ className = "" }) => {
  return (
    <div className="relative">
      <img
        className={`pointer-events-none absolute left-0 w-full block z-[9999] ${className}`}
        src={transition}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default Transition1;