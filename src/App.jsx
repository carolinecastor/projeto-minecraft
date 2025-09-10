import { useState } from "react";
import logoMine from "./assets/logo-minecraft.png";
import fundoMine from "./assets/fundo-mine.png";
import detalhes from "./assets/detalhes-projeto-mine.png";
import Button from "./components/Button";
import Title from "./components/Title";
import Description from "./components/Description";
import transition from "./assets/transition.png";
import steven from "./assets/steven.png";
import alex from "./assets/alex.png";
import stevenCabeca from "./assets/steven-cabeca.png";
import alexCabeca from "./assets/alex-cabeca.png";
import transition2 from "./assets/transition-2.png";

function App() {
  const [selectedCursor, setSelectedCursor] = useState(null);

  const handleStevenClick = () => {
    setSelectedCursor(stevenCabeca);
  };

  const handleAlexClick = () => {
    setSelectedCursor(alexCabeca);
  };

  return (
    <div
      style={{
        cursor: selectedCursor ? `url(${selectedCursor}) 16 16, auto` : "default",
      }}
    >
      <header className="bg-[rgb(30,30,30)] h-12 sm:h-16 relative z-20">
        <div className="flex justify-center absolute w-full -bottom-2 sm:-bottom-3">
          <img className="w-40 sm:w-56 md:w-64" src={logoMine} alt="" />
        </div>
      </header>
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
      <section className="bg-[#1A1A1A] h-[70vh] flex items-center gap-28 relative">
        <div className="flex items-center justify-center w-1/2 relative">
          <img 
            src={steven} 
            alt="" 
            className="absolute bottom-10 left-48 cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-lg" 
            onClick={handleStevenClick}
          />
          <img 
            src={alex} 
            alt="" 
            className="absolute -top-20 right-0 cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-lg" 
            onClick={handleAlexClick}
          />
        </div>
        <div className="w-1/2 h-full mt-40">
          <Title className="text-5xl! w-2/3 leading-20">
            ESCOLHA SEU PERSONAGEM
          </Title>
          <Description className="w-2/3">
            Antes de começar, escolha quem vai te acompanhar nessa jornada: {""}
            <span className="font-bold">Steve</span> ou{" "}
            <span className="font-bold">Alex</span>.
            <br />
            Assim que decidir, o seu cursor ganhará a forma da cabeça do
            personagem escolhido e você entrará no modo espectador do Minecraft.
            <br />A imersão começa agora! {""}
            <span className="font-bold">Qual será o seu herói?</span>
          </Description>
        </div>
        <div className="">
          <img
            className="absolute -bottom-25 left-0 w-full block z-10"
            src={transition2}
            alt=""
          />
        </div>
      </section>
    </div>
  );
}

export default App;
