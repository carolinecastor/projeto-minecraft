import transition2 from "../../assets/transition-2.png";

const Transition = ({ className = "" }) => {
  return (
    <div className="relative">
      <img
        className={`pointer-events-none absolute left-0 w-full block z-[100] ${className}`}
        src={transition2}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default Transition;
