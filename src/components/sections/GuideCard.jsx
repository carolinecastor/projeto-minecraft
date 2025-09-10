import { useState } from "react";
import { Title, Button } from "../ui";
import terraGuia from "../../assets/terra-guia.png";
import netherGuia from "../../assets/nether-guia.png";
import preparacaoGuia from "../../assets/preparacao-guia.png";
import endGuia from "../../assets/end-guia.png";
import fundoMine from "../../assets/fundo-mine.png";

const GuideCard = () => {
  const [selectedTab, setSelectedTab] = useState("overworld");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tabs = [
    { id: "overworld", label: "OVERWORLD", icon: terraGuia },
    { id: "nether", label: "NETHER", icon: netherGuia },
    { id: "preparacao", label: "PREPARAÇÃO - THE END", icon: preparacaoGuia },
    { id: "theend", label: "THE END", icon: endGuia },
  ];

  const guideSteps = {
    overworld: [
      {
        image: fundoMine,
        description: "COMEÇANDO NO OVERWORLD: COLETE MADEIRA E CRIE SUAS PRIMEIRAS FERRAMENTAS. CONSTRUA UM ABRIGO ANTES DO ANOITECER PARA SE PROTEGER DOS MONSTROS."
      },
      {
        image: fundoMine,
        description: "EXPLORANDO O MUNDO: ENCONTRE ALDEIAS, MASMORRAS E RECURSOS. MINERE CARVÃO, FERRO E OUTROS MINÉRIOS PARA CRIAR EQUIPAMENTOS MELHORES."
      }
    ],
    nether: [
      {
        image: fundoMine,
        description: "ENTRANDO NO NETHER: CRIE UM PORTAL COM OBSIDIANA E ACENDEDOR. PREPARE-SE COM ARMADURA E COMIDA ANTES DE ENTRAR NESTA DIMENSÃO PERIGOSA."
      },
      {
        image: fundoMine,
        description: "SOBREVIVENDO NO NETHER: EVITE LAVA, LUTE CONTRA GHASTS E PIGLINS. COLETE BLAZE RODS, QUARTZO DO NETHER E OUTROS RECURSOS ÚNICOS."
      }
    ],
    preparacao: [
      {
        image: fundoMine,
        description: "EQUIPAMENTOS ESSENCIAIS: CRIE ARMADURA DE DIAMANTE, ESPADAS ENCANTADAS E ARCO COM FLECHAS. PREPARE POÇÕES DE CURA E FORÇA PARA A BATALHA."
      },
      {
        image: fundoMine,
        description: "ENCONTRANDO A FORTALEZA: USE OLHOS DE ENDER PARA LOCALIZAR A FORTALEZA DO END. ATIVE O PORTAL COM 12 OLHOS DE ENDER."
      }
    ],
    theend: [
      {
        image: fundoMine,
        description: "CHEGANDO AO END: ENTRE NO PORTAL E PREPARE-SE PARA A BATALHA FINAL. NÃO OLHE DIRETAMENTE PARA OS ENDERMEN AO REDOR."
      },
      {
        image: fundoMine,
        description: "DERROTANDO O ENDER DRAGON: DESTRUA OS CRISTAIS DO END NAS TORRES PRIMEIRO. DEPOIS ATAQUE O DRAGÃO QUANDO ELE POUSAR NO PORTAL CENTRAL."
      }
    ]
  };

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    const currentSteps = guideSteps[selectedTab];
    if (currentImageIndex < currentSteps.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const handlePrevious = () => {
    const currentSteps = guideSteps[selectedTab];
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(currentSteps.length - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <Title className="text-white font-minecraft text-4xl!">
          GUIA MINECRAFT
        </Title>
      </div>

      <div className="flex">
        {/* Navigation Tabs */}
        <div className="w-1/3">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`flex items-center px-4 py-4 cursor-pointer transition-colors font-minecraft text-white ${
                selectedTab === tab.id
                  ? "bg-[#3D3938]"
                  : "bg-[#262523] hover:bg-[#3D3938]"
              }`}
              style={{
                borderLeft: "2px solid #747474",
                borderTop: index === 0 ? "2px solid #747474" : "none",
                borderBottom:
                  index === tabs.length - 1
                    ? "2px solid #747474"
                    : index < tabs.length - 1
                    ? "2px solid #747474"
                    : "none",
              }}
              onClick={() => handleTabClick(tab.id)}
            >
              <img 
                src={tab.icon} 
                alt={tab.label} 
                className="w-8 h-8 mr-3" 
                style={{
                  imageRendering: 'auto',
                  filter: 'contrast(1.1) brightness(1.05)'
                }}
              />
              <span className="text-sm">{tab.label}</span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-2/3">
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: "#4A4A4A",
              border: "30px solid #4A4A4A",
              outline: "2px solid #747474",
            }}
          >
            {/* Image Display */}
            <div className="relative px-2 pt-6">
              <img
                src={guideSteps[selectedTab][currentImageIndex].image}
                alt="Guide content"
                className="w-full h-80 object-contain rounded-lg"
                style={{
                  imageRendering: 'auto',
                  filter: 'contrast(1.1) brightness(1.05)',
                  backgroundColor: '#2a2a2a'
                }}
                key={`${selectedTab}-${currentImageIndex}`}
              />
            </div>

            {/* Description */}
            <div className="px-2 pb-6 pt-4">
              <p className="text-white font-minecraft text-sm mb-6 text-left">
                {guideSteps[selectedTab][currentImageIndex].description}
              </p>

              {/* Navigation Buttons */}
              <div className="flex items-center">
                <div className="flex-1">
                  {currentImageIndex > 0 && (
                    <Button onClick={handlePrevious} className="px-4 py-2">
                      ANTERIOR
                    </Button>
                  )}
                </div>
                <div className="flex-1 text-center">
                  <span className="text-white font-minecraft text-sm">
                    {currentImageIndex + 1} / {guideSteps[selectedTab].length}
                  </span>
                </div>
                <div className="flex-1 flex justify-end">
                  <Button onClick={handleNext} className="px-4 py-2">
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
