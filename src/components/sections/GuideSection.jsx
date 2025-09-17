import MinecraftBackground from "../ui/MinecraftBackground";
import GuideCard from "./GuideCard";

const GuideSection = () => {
  return (
    <section
      id="guides"
      className="relative min-h-screen flex items-center justify-center py-4 sm:py-8 md:py-16 px-1 sm:px-2 md:px-4 overflow-visible"
      style={{ contentVisibility: "auto" }}
    >
      <MinecraftBackground />

      <div className="relative z-10">
        <GuideCard />
      </div>
    </section>
  );
};

export default GuideSection;
