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
      className="bg-[#1A1A1A] h-[70vh] flex items-center gap-28 relative overflow-visible"
      style={{ contentVisibility: "auto" }}
    >
      <div className="flex items-center justify-center w-1/2 relative">
        <img
          src={steven}
          alt=""
          className="absolute -bottom-4 left-48 cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-lg"
          onClick={handleStevenClick}
          loading="lazy"
          decoding="async"
        />
        <img
          src={alex}
          alt=""
          className="absolute -top-15 right-0 cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-lg"
          onClick={handleAlexClick}
          loading="lazy"
          decoding="async"
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
    </section>
  );
};

export default CharacterSelection;
