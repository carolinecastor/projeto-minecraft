import terraTransition from "../../assets/terra-transition.png";
import bgPedra from "../../assets/bg-pedra.webp";

const CraftSection = () => {
  return (
    <section
      id="craft"
      className="relative min-h-screen flex items-center justify-center py-10 sm:py-14 px-4 overflow-hidden -mt-4"
      style={{ contentVisibility: "auto" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgPedra})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center top -18px",
          imageRendering: "pixelated",
        }}
      />
      <div className="relative z-10 w-full max-w-6xl mt-24 sm:mt-28">
        {/* Conteúdo da seção craft */}
      </div>

      <img
        className="pointer-events-none absolute left-0 w-full block z-[100] -top-13"
        src={terraTransition}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </section>
  );
};

export default CraftSection;
