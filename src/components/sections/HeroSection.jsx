import fundoMine from "../../assets/fundomine.webp";
import detalhes from "../../assets/detalhes-projeto-mine.png";
import { Title, Description, Button, Transition1, Transition } from "../ui";

const HeroSection = () => {
  const backgroundStyle = {
    backgroundImage: `url(${fundoMine})`,
  };

  const scrollToCharacters = () => {
    const element = document.getElementById("characters");
    if (element) {
      const elementPosition = element.offsetTop - 200;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative z-0 h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)] bg-cover bg-center bg-no-repeat"
      style={{ ...backgroundStyle, contentVisibility: "auto" }}
    >
      <div className="flex items-center justify-center sm:justify-start h-full container mx-auto px-4 sm:px-5">
        <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg">
          <div className="bg-[rgb(30,30,30)] w-full p-4 sm:p-6 relative">
            <div className="absolute -top-22 right-0 block">
              <img
                src={detalhes}
                alt=""
                className="md:w-auto max-w-none"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="text-white font-minecraft">
              <Title>PROJETO MINECRAFT</Title>
              <Description>
                ENTRE EM UM MUNDO DE BLOCOS CHEIO DE AVENTURAS, CRIATIVIDADE E
                DIVERSÃO. AQUI, VOCÊ SERÁ TRANSPORTADO PARA DENTRO DO UNIVERSO
                MINECRAFT DE UMA FORMA INTERATIVA E ÚNICA. EXPLORE, DESCUBRA E
                VIVA ESSA EXPERIÊNCIA DE UM JEITO DIFERENTE: DIRETO DA TELA PARA
                A SUA IMAGINAÇÃO!
              </Description>
              <Button onClick={scrollToCharacters}>PLAY</Button>
            </div>
          </div>
        </div>
        <div className="p-5 absolute bottom-5 -left-10 w-screen">
          <Transition1 className="-top-13 block z-[100] bg-transparent min-w-5xl" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
