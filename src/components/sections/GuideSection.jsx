import fundoTerra from "../../assets/fundo-terra.jpg";
import GuideCard from "./GuideCard";

const GuideSection = () => {
  return (
    <section
      className="py-16 px-4 bg-cover bg-no-repeat min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${fundoTerra})`,
        backgroundPosition: "center top -110px",
      }}
    >
      <GuideCard />
    </section>
  );
};

export default GuideSection;