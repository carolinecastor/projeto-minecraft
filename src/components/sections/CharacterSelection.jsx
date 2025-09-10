import { useState } from "react";
import steven from "../../assets/steven.png";
import alex from "../../assets/alex.png";
import stevenCabeca from "../../assets/steven-cabeca.png";
import alexCabeca from "../../assets/alex-cabeca.png";
import transition2 from "../../assets/transition-2.png";
import { Title, Description } from "../ui";

const CharacterSelection = ({ onCursorChange }) => {
  const handleStevenClick = () => {
    onCursorChange(stevenCabeca);
  };

  const handleAlexClick = () => {
    onCursorChange(alexCabeca);
  };

  return (
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
          className="absolute -bottom-28 left-0 w-full block z-10"
          src={transition2}
          alt=""
        />
      </div>
    </section>
  );
};

export default CharacterSelection;