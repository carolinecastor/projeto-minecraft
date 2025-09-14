import { useCallback } from "react";
import steven from "../../assets/steven.png";
import alex from "../../assets/Alex.png";
import stevenCabeca from "../../assets/steven-cabeca.png";
import alexCabeca from "../../assets/alex-cabeca.png";
import { Title, Description } from "../ui";
import { playHurtSound } from "../../utils/soundUtils";

const CharacterSelection = ({ onCursorChange }) => {
  const handleStevenClick = useCallback(() => {
    playHurtSound();
    onCursorChange(stevenCabeca);
  }, [onCursorChange]);

  const handleAlexClick = useCallback(() => {
    playHurtSound();
    onCursorChange(alexCabeca);
  }, [onCursorChange]);

  return (
    <section
      id="characters"
      className="bg-[#1A1A1A] min-h-[70vh] md:h-[70vh] flex flex-col md:flex-row items-center gap-8 sm:gap-16 md:gap-28 relative overflow-visible px-4 sm:px-0 py-8 md:py-0"
      style={{ contentVisibility: "auto" }}
    >
      <div className="flex items-center justify-center w-full md:w-1/2 relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
        <img
          src={steven}
          alt=""
          className="absolute -bottom-2 sm:-bottom-4 left-4 sm:left-12 md:left-24 lg:left-48 cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-lg w-24 sm:w-32 md:w-auto"
          onClick={handleStevenClick}
          loading="lazy"
          decoding="async"
        />
        <img
          src={alex}
          alt=""
          className="absolute -top-6 sm:-top-10 md:-top-15 right-0 sm:right-4 md:right-0 cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-lg w-24 sm:w-32 md:w-auto"
          onClick={handleAlexClick}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="w-full md:w-1/2 h-full mt-8 md:mt-40">
        <Title className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl! w-full md:w-2/3 leading-tight md:leading-20">
          ESCOLHA SEU PERSONAGEM
        </Title>
        <Description className="w-full md:w-2/3">
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
    </section>
  );
};

export default CharacterSelection;
