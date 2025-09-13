import pedraTransition from "../../assets/pedra-transition.png";

const PedraTransition = () => {
  return (
    <div className="bg-[#1A1A1A]">
      <img
        src={pedraTransition}
        alt=""
        className="w-full block -mt-22"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default PedraTransition;
