import fundoMine from "../../assets/fundo-mine.png";
import detalhes from "../../assets/detalhes-projeto-mine.png";
import transition from "../../assets/transition.png";
import { Title, Description, Button } from "../ui";

const HeroSection = () => {
  return (
    <section
      className="relative z-0 h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${fundoMine})`,
      }}
    >
      <div className="flex items-center justify-center sm:justify-start h-full container mx-auto px-4 sm:px-5">
        <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg">
          <div className="bg-[rgb(30,30,30)] w-full p-4 sm:p-6 relative">
            <div className="absolute -top-22 right-0 block">
              <img src={detalhes} alt="" className="md:w-auto max-w-none" />
            </div>
            <div className="text-white font-minecraft">
              <Title>PROJETO MINECRAFT</Title>
              <Description>
                ENTRE EM UM MUNDO DE BLOCOS CHEIO DE AVENTURAS, CRIATIVIDADE E
                DIVERSÃO. AQUI, VOCÊ SERÁ TRANSPORTADO PARA DENTRO DO UNIVERSO
                MINECRAFT DE UMA FORMA INTERATIVA E ÚNICA. EXPLORE, DESCUBRA E
                VIVA ESSA EXPERIÊNCIA DE UM JEITO DIFERENTE: DIRETO DA TELA
                PARA A SUA IMAGINAÇÃO!
              </Description>
              <Button>PLAY</Button>
            </div>
          </div>
        </div>
      </div>
      <img
        src={transition}
        alt=""
        className="pointer-events-none absolute -bottom-8 sm:-bottom-12 md:-bottom-16 left-0 w-full block z-10"
      />
    </section>
  );
};

export default HeroSection;