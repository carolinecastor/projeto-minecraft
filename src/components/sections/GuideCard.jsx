import { useState, useCallback, useMemo, memo } from "react";
import { Title, Button } from "../ui";
import { playClickSound } from "../../utils/soundUtils";
import terraGuia from "../../assets/terra-guia.png";
import netherGuia from "../../assets/nether-guia.png";
import preparacaoGuia from "../../assets/preparacao-guia.png";
import endGuia from "../../assets/end-guia.png";
import madeiraOverworld from "../../assets/madeira-overworld.png";
import fomeOverworld from "../../assets/fome-overworld.jpg";
import craftOverworld from "../../assets/craft - overworld.jpeg";
import stevenOverworld from "../../assets/steven- overworld.jpg";
import casaOverworld from "../../assets/casa-overworld.png";
import mineirandoOverworld from "../../assets/mineirando-overworld.png";
import fullOverworld from "../../assets/full-overworld.png";
import dimaOverworld from "../../assets/dima-overworld.png";
import portalOverworld from "../../assets/portal-overworld.jpeg";
import fortalezaNether from "../../assets/fortaleza-nether.webp";
import blazersNether from "../../assets/blazers-nether.png";
import endermanNether from "../../assets/enderman-nether.png";
import olhosPreparacao from "../../assets/olhos-preparacao.jpg";
import jogandoPreparacao from "../../assets/jogando-preparacao.png";
import portalPreparacao from "../../assets/portal-preparacao.webp";
import arcoEnd from "../../assets/arco-end.jpg";
import matandoEnd from "../../assets/matando-end.jpg";
import dragaoEnd from "../../assets/dragao-end.jpg";
import ovoEnd from "../../assets/ovo-end.jpg";
import fraseEnd from "../../assets/frase-end.webp";

const TabItem = memo(({ tab, index, isSelected, tabsLength, onTabClick }) => (
  <div
    className={`flex items-center px-1 sm:px-2 md:px-4 py-2 sm:py-3 md:py-4 cursor-pointer transition-colors font-minecraft text-white border-2 border-[#747474] ${
      index === 0 ? "lg:border-t-2 lg:border-t-[#747474]" : ""
    } ${
      index === tabsLength - 1 || index < tabsLength - 1
        ? "lg:border-b-2 lg:border-b-[#747474]"
        : ""
    } ${
      isSelected ? "bg-[#3D3938]" : "bg-[#262523] hover:bg-[#3D3938]"
    } rounded lg:rounded-none lg:border-l-2 lg:border-r-0 lg:border-t-0 lg:border-b-0 lg:border-l-[#747474] whitespace-nowrap min-w-max`}
    onClick={() => {
      playClickSound();
      onTabClick();
    }}
  >
    <img
      src={tab.icon}
      alt={tab.label}
      className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 mr-1 sm:mr-2 md:mr-3 flex-shrink-0"
    />
    <span className="text-[10px] sm:text-xs md:text-sm leading-tight">
      {tab.label}
    </span>
  </div>
));

const GuideCard = () => {
  const [selectedTab, setSelectedTab] = useState("overworld");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tabs = useMemo(
    () => [
      { id: "overworld", label: "OVERWORLD", icon: terraGuia },
      { id: "nether", label: "NETHER", icon: netherGuia },
      { id: "preparacao", label: "PREPARAÇÃO - THE END", icon: preparacaoGuia },
      { id: "theend", label: "THE END", icon: endGuia },
    ],
    []
  );

  const guideSteps = useMemo(
    () => ({
      overworld: [
        {
          image: madeiraOverworld,
          description:
            "O PRIMEIRO PASSO É SIMPLES: ENCONTRE UMA ÁRVORE E QUEBRE A MADEIRA COM AS MÃOS. ESSE RECURSO SERÁ A BASE PARA CRIAR SUAS PRIMEIRAS FERRAMENTAS.",
        },
        {
          image: fomeOverworld,
          description:
            "FIQUE ATENTO! SUA BARRA DE VIDA E DE FOME SÃO ESSENCIAIS. COMER MANTÉM SUA VIDA CHEIA, E SEM COMIDA VOCÊ NÃO CONSEGUE SE CURAR.",
        },
        {
          image: craftOverworld,
          description:
            "COM 4 BLOCOS DE MADEIRA, CRIE SUA MESA DE TRABALHO. ELA SERÁ ESSENCIAL PARA FABRICAR FERRAMENTAS, ARMAS E PRATICAMENTE TUDO NO JOGO.",
        },
        {
          image: stevenOverworld,
          description:
            "À NOITE, INIMIGOS APARECEM! ZUMBIS, ESQUELETOS E ARANHAS PODEM ACABAR COM VOCÊ. TENHA CUIDADO, EQUIPE-SE E SEMPRE ESTEJA PREPARADO PARA LUTAR OU SE ESCONDER.",
        },
        {
          image: casaOverworld,
          description:
            "PROTEJA-SE! FAÇA UM ABRIGO SIMPLES PARA SE ESCONDER DOS MOBS E GUARDAR SEUS ITENS. CASAS SEGURAS SÃO FUNDAMENTAIS PARA SOBREVIVER.",
        },
        {
          image: mineirandoOverworld,
          description:
            "HORA DE CAVAR FUNDO! MINERE PEDRA, CARVÃO E FERRO. ESSES RECURSOS SERÃO NECESSÁRIOS PARA EVOLUIR SEUS EQUIPAMENTOS.",
        },
        {
          image: fullOverworld,
          description:
            "EQUIPE-SE TOTALMENTE COM ARMADURAS E FERRAMENTAS DE FERRO. ESSE É O PRIMEIRO GRANDE PASSO PARA FICAR MAIS FORTE E SEGURO.",
        },
        {
          image: dimaOverworld,
          description:
            "CAVE ATÉ CAMADAS PROFUNDAS E PROCURE O COBIÇADO DIAMANTE. COM ELE, VOCÊ PODERÁ CRIAR FERRAMENTAS PODEROSAS E SE PREPARAR PARA O PRÓXIMO DESAFIO.",
        },
        {
          image: portalOverworld,
          description:
            "COM 10 BLOCOS DE OBSIDIANA, MONTE UM RETÂNGULO DE 4X5 BLOCOS, DEIXANDO O MEIO VAZIO. USE UM ISQUEIRO (FERRO + PEDERNEIRA) PARA ACENDER E ABRIR O PORTAL. AO ATRAVESSAR, VOCÊ CHEGARÁ AO NETHER, CHEIO DE PERIGOS E RECURSOS IMPORTANTES!",
        },
      ],
      nether: [
        {
          image: fortalezaNether,
          description:
            "EXPLORE O NETHER ATÉ ENCONTRAR UMA FORTALEZA. É LÁ QUE FICAM OS BLAZES, INIMIGOS ESSENCIAIS PARA AVANÇAR.",
        },
        {
          image: blazersNether,
          description:
            "DERROTE OS BLAZES E COLETE AS VARAS DE BLAZE. TRANSFORME-AS EM PÓ DE BLAZE, INGREDIENTE FUNDAMENTAL PARA CRIAR OS OLHOS DO FIM.",
        },
        {
          image: endermanNether,
          description:
            "ENFRENTE ENDERMEN NO OVERWORLD OU NO NETHER. ELES DROPAM PÉROLAS DO ENDER, O OUTRO ITEM NECESSÁRIO PARA A SUA JORNADA.",
        },
      ],
      preparacao: [
        {
          image: olhosPreparacao,
          description:
            "COMBINE PÓ DE BLAZE + PÉROLA DO ENDER PARA CRIAR OS OLHOS DO FIM. PARA ATIVAR O PORTAL, VOCÊ PRECISARÁ DE 12 UNIDADES. ELES TAMBÉM SERVEM PARA ENCONTRAR A FORTALEZA E ATIVAR O PORTAL PARA THE END.",
        },
        {
          image: jogandoPreparacao,
          description:
            "JOGUE OS OLHOS DO FIM NO AR PARA LOCALIZAR A FORTALEZA SUBTERRÂNEA. CADA OLHO TEM UMA CHANCE DE FALHAR OU DESAPARECER (APROXIMADAMENTE 20%), ENTÃO LEVE ALGUNS EXTRAS.",
        },
        {
          image: portalPreparacao,
          description:
            "NA FORTALEZA, COLOQUE OS OLHOS DO FIM NAS MOLDURAS ATÉ ATIVAR O PORTAL. PREPARE-SE: O VERDADEIRO DESAFIO COMEÇA AGORA.",
        },
      ],
      theend: [
        {
          image: arcoEnd,
          description:
            "NO THE END, DESTRUA OS CRISTAIS DO END EM CIMA DAS TORRES DE OBSIDIANA. ELES CURAM O DRAGÃO, ENTÃO ACERTE-OS COM ARCO E FLECHA. DICA: ALGUNS ESTÃO CERCADOS POR GRADES DE FERRO, SUBA E QUEBRE MANUALMENTE.",
        },
        {
          image: matandoEnd,
          description:
            "COM OS CRISTAIS DESTRUÍDOS, CONCENTRE-SE NO DRAGÃO DO END. USE ARCO QUANDO ELE ESTIVER VOANDO E ESPADA QUANDO POUSAR NA FONTE DE OBSIDIANA.",
        },
        {
          image: dragaoEnd,
          description:
            "A BATALHA FINAL CONTRA O DRAGÃO DO FIM! DERROTE-O PARA LIBERAR O PORTAL E CONQUISTAR O MAIOR DESAFIO DO MINECRAFT.",
        },
        {
          image: ovoEnd,
          description:
            "AO VENCER, ELE DEIXARÁ CAIR MUITA EXPERIÊNCIA E APARECERÁ O OVO DO DRAGÃO SOBRE O PORTAL DE SAÍDA. UM TROFÉU SIMBÓLICO DA SUA CONQUISTA.",
        },
        {
          image: fraseEnd,
          description:
            "AO ATRAVESSAR O PORTAL, VOCÊ É PRESENTEADO COM OS CRÉDITOS FINAIS, CELEBRANDO SUA VITÓRIA. PARABÉNS! VOCÊ DERROTOU O DRAGÃO DO FIM E CONCLUIU A JORNADA ÉPICA DO MINECRAFT.",
        },
      ],
    }),
    []
  );

  const handleTabClick = useCallback((tabId) => {
    setSelectedTab(tabId);
    setCurrentImageIndex(0);
  }, []);

  const tabClickHandlers = useMemo(() => {
    return tabs.reduce((handlers, tab) => {
      handlers[tab.id] = () => handleTabClick(tab.id);
      return handlers;
    }, {});
  }, [tabs, handleTabClick]);

  const handleNext = useCallback(() => {
    const currentSteps = guideSteps[selectedTab];
    if (currentImageIndex < currentSteps.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      // Move to next tab
      const currentTabIndex = tabs.findIndex((tab) => tab.id === selectedTab);
      const nextTabIndex = (currentTabIndex + 1) % tabs.length;
      setSelectedTab(tabs[nextTabIndex].id);
      setCurrentImageIndex(0);
    }
  }, [selectedTab, currentImageIndex, tabs, guideSteps]);

  const handlePrevious = useCallback(() => {
    const currentSteps = guideSteps[selectedTab];
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      // Move to previous tab
      const currentTabIndex = tabs.findIndex((tab) => tab.id === selectedTab);
      const previousTabIndex =
        currentTabIndex === 0 ? tabs.length - 1 : currentTabIndex - 1;
      const previousTab = tabs[previousTabIndex];
      const previousTabSteps = guideSteps[previousTab.id];
      setSelectedTab(previousTab.id);
      setCurrentImageIndex(previousTabSteps.length - 1);
    }
  }, [selectedTab, currentImageIndex, tabs, guideSteps]);

  const contentAreaStyle = useMemo(
    () => ({
      backgroundColor: "#4A4A4A",
      border: "30px solid #4A4A4A",
      outline: "2px solid #747474",
    }),
    []
  );

  const currentStep = useMemo(
    () => guideSteps[selectedTab][currentImageIndex],
    [selectedTab, currentImageIndex]
  );

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-2 sm:px-4">
      <div className="text-center mb-4 md:mb-6">
        <Title className="text-white font-minecraft text-lg sm:text-xl md:text-3xl lg:text-4xl">
          GUIA MINECRAFT
        </Title>
      </div>

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 md:gap-4">
        {/* Navigation Tabs */}
        <div className="w-full lg:w-1/3">
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 lg:gap-0 pb-2 lg:pb-0">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="flex-shrink-0 lg:flex-shrink">
                <TabItem
                  tab={tab}
                  index={index}
                  isSelected={selectedTab === tab.id}
                  tabsLength={tabs.length}
                  onTabClick={tabClickHandlers[tab.id]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-2/3">
          <div
            className="overflow-hidden h-[500px] sm:h-[550px] md:h-[600px] lg:h-[600px] flex flex-col"
            style={contentAreaStyle}
          >
            {/* Image Display */}
            <div className="relative px-2 sm:px-2 pt-4 sm:pt-4 md:pt-6">
              <img
                src={currentStep.image}
                alt="Guide content"
                className="w-full h-48 sm:h-52 md:h-64 lg:h-80 object-cover rounded-lg"
                loading="lazy"
              />
            </div>

            {/* Description */}
            <div className="px-2 sm:px-2 pb-3 sm:pb-4 md:pb-6 pt-3 sm:pt-3 md:pt-4 flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <p className="text-white font-minecraft pt-4 text-xs sm:text-xs md:text-sm mb-3 sm:mb-4 md:mb-6 text-left leading-relaxed sm:leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center mt-auto gap-1 sm:gap-2">
                <div className="flex-1">
                  {(selectedTab !== "overworld" || currentImageIndex > 0) && (
                    <Button
                      onClick={handlePrevious}
                      className="px-2 sm:px-2 md:px-4 py-2 sm:py-2 text-xs sm:text-xs md:text-sm w-full lg:w-auto"
                    >
                      ANTERIOR
                    </Button>
                  )}
                </div>
                <div className="flex-1 text-center">
                  <span className="text-white font-minecraft text-xs sm:text-xs md:text-sm">
                    {currentImageIndex + 1} / {guideSteps[selectedTab].length}
                  </span>
                </div>
                <div className="flex-1 flex justify-end">
                  <Button
                    onClick={handleNext}
                    className="px-2 sm:px-2 md:px-4 py-2 sm:py-2 text-xs sm:text-xs md:text-sm w-full lg:w-auto"
                  >
                    PRÓXIMO
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
