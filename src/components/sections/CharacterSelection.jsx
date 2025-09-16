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
      className="bg-[#1A1A1A] h-[70vh] flex justify-center items-center gap-28 relative overflow-visible
                 max-lg:gap-16 max-lg:px-8
                 max-md:h-auto max-md:flex-col max-md:gap-8 max-md:py-12 max-md:px-4"
      style={{ contentVisibility: "auto" }}
    >
      <div
        className="flex items-center justify-center w-1/2 relative
                      max-lg:w-1/2
                      max-md:w-full max-md:h-64 max-md:order-2"
      >
        <img
          src={steven}
          alt=""
          className="absolute -bottom-4 left-48 cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-lg
                     max-lg:left-16 max-lg:scale-75 max-lg:-bottom-8
                     max-md:static max-md:w-48 max-md:h-auto max-md:mr-4 max-md:hover:scale-105"
          onClick={handleStevenClick}
          loading="lazy"
          decoding="async"
        />
        <img
          src={alex}
          alt=""
          className="absolute -top-15  right-0 cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-lg
                     max-lg:right-16 max-lg:scale-75 max-lg:-top-8
                     max-md:static max-md:w-48 max-md:h-auto max-md:ml-4 max-md:hover:scale-105"
          onClick={handleAlexClick}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div
        className="w-1/2 h-full mt-40
                      max-lg:mt-20 max-lg:w-1/2
                      max-md:w-full max-md:mt-0 max-md:text-center max-md:order-1"
      >
        <Title
          className="text-2xl! w-2/3 leading-20
                          max-lg:text-4xl max-lg:w-full max-lg:leading-tight
                          max-md:text-3xl max-md:w-full max-md:leading-tight max-md:mb-6"
        >
          ESCOLHA SEU PERSONAGEM
        </Title>
        <Description
          className="w-2/3
                                max-lg:w-full max-lg:text-base max-lg:leading-relaxed
                                max-md:w-full max-md:text-sm max-md:leading-relaxed"
        >
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
