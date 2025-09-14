import { useState, useEffect } from "react";
import terraTransition from "../../assets/terra-transition.png";
import bgPedra from "../../assets/bg-pedra.webp";
import cetaIcon from "../../assets/ceta.png";
import criacaoGrid from "../../assets/criacao.png";
import inventarioGrid from "../../assets/inventario.png";
import quadradoGrid from "../../assets/quadrado.png";

// Import category icons
import paredeCategoryIcon from "../../assets/parede.png";
import espadeArmaduraCategoryIcon from "../../assets/espada-armadura.png";
import camaCategoryIcon from "../../assets/cama.png";
import florCategoryIcon from "../../assets/flor.png";
import lupaCategoryIcon from "../../assets/lupa.png";
import {
  getCraftableItems,
  getRecipesByItemId,
  getItemById,
  normalizeRecipeShape,
  getSpecialCraftingInfo,
} from "../../utils/craftHelper";
import { HelpCard } from "../ui";
import { playClickSound } from "../../utils/soundUtils";

const CraftSection = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("blocks");
  const [showSearch, setShowSearch] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const craftableItems = getCraftableItems();

  // Categorias do inventário criativo com imagens
  const categories = {
    blocks: {
      icon: paredeCategoryIcon,
      name: "Blocos",
      items: craftableItems.filter((item) =>
        [
          "stone",
          "wood",
          "planks",
          "brick",
          "cobblestone",
          "sand",
          "gravel",
          "dirt",
          "grass",
          "log",
          "leaves",
          "wool",
          "concrete",
          "terracotta",
          "glass",
          "obsidian",
        ].some(
          (keyword) =>
            item.name?.toLowerCase().includes(keyword) ||
            item.readable?.toLowerCase().includes(keyword)
        )
      ),
    },
    tools: {
      icon: espadeArmaduraCategoryIcon,
      name: "Ferramentas",
      items: craftableItems.filter((item) =>
        [
          "sword",
          "pickaxe",
          "axe",
          "shovel",
          "hoe",
          "bow",
          "arrow",
          "armor",
          "helmet",
          "chestplate",
          "leggings",
          "boots",
          "shield",
          "tool",
          "weapon",
        ].some(
          (keyword) =>
            item.name?.toLowerCase().includes(keyword) ||
            item.readable?.toLowerCase().includes(keyword)
        )
      ),
    },
    furniture: {
      icon: camaCategoryIcon,
      name: "Móveis",
      items: craftableItems.filter((item) =>
        [
          "bed",
          "chair",
          "table",
          "chest",
          "furnace",
          "crafting",
          "brewing",
          "enchanting",
          "anvil",
          "cauldron",
          "composter",
          "barrel",
          "smoker",
          "blast_furnace",
          "stonecutter",
          "grindstone",
          "cartography",
          "fletching",
          "smithing",
          "loom",
        ].some(
          (keyword) =>
            item.name?.toLowerCase().includes(keyword) ||
            item.readable?.toLowerCase().includes(keyword)
        )
      ),
    },
    decoration: {
      icon: florCategoryIcon,
      name: "Decoração",
      items: craftableItems.filter((item) =>
        [
          "flower",
          "painting",
          "item_frame",
          "banner",
          "carpet",
          "candle",
          "torch",
          "lantern",
          "redstone_lamp",
          "sea_lantern",
          "glowstone",
          "shroomlight",
          "end_rod",
          "beacon",
          "conduit",
          "head",
          "skull",
          "pot",
          "decoration",
        ].some(
          (keyword) =>
            item.name?.toLowerCase().includes(keyword) ||
            item.readable?.toLowerCase().includes(keyword)
        )
      ),
    },
    search: {
      icon: lupaCategoryIcon,
      name: "Busca",
      items: craftableItems,
    },
  };

  const activeItems = showSearch
    ? craftableItems
    : categories[activeTab]?.items || [];
  const filteredItems = activeItems.filter(
    (item) =>
      item.readable?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item, index) => {
    playClickSound();
    const itemWithId = { ...item, id: item.id !== undefined ? item.id : index };
    setSelectedItem(itemWithId);
    setSelectedRecipeIndex(0);
    setAnimationIndex(0); // Reset animation when selecting new item
  };

  const recipes = selectedItem
    ? getRecipesByItemId(selectedItem.id?.toString())
    : [];
  const currentRecipe = recipes[selectedRecipeIndex];

  // Sistema de animação para receitas múltiplas (efeito GIF)
  useEffect(() => {
    if (recipes.length > 1) {
      const interval = setInterval(() => {
        setAnimationIndex((prevIndex) => (prevIndex + 1) % recipes.length);
      }, 3000); // Troca a cada 3 segundos
      return () => clearInterval(interval);
    }
  }, [recipes.length]);

  const animatedRecipe =
    recipes.length > 1 ? recipes[animationIndex] : currentRecipe;

  const handleItemHover = (item, e) => {
    setHoveredItem(item);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.right + 10,
      y: rect.top + rect.height - 10,
    });
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  return (
    <section
      id="craft"
      className="relative min-h-screen flex items-center justify-center py-10 sm:py-14 px-4 overflow-hidden -mt-2 sm:-mt-3 md:-mt-4"
      style={{
        contentVisibility: "auto",
        fontFamily: "'Minecraft', monospace, Arial, sans-serif",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgPedra})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center top -18px",
          imageRendering: "pixelated",
        }}
      />

      {/* Background terra estendido para baixo - Desktop only */}
      <div className="hidden md:block">
        <div
          className="absolute left-0 right-0 bottom-0 h-40 z-0"
          style={{
            backgroundImage: `url(${bgPedra})`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            imageRendering: "pixelated",
            transform: "translateY(80%)",
            backgroundPosition: "center bottom",
          }}
        />
      </div>

      {/* Craft Guide Content */}
      <div className="relative z-10 w-full max-w-7xl mt-16 sm:mt-20">
        {/* Minecraft-style Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: "bold",
              color: "#FFFFFF",
              textShadow: "2px 2px 0px #000000",
              margin: "0 0 20px 0",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            MESA DE TRABALHO
          </h1>
          <p
            style={{
              color: "#E0E0E0",
              fontSize: "1.3rem",
              margin: "0",
              fontWeight: "500",
              opacity: "0.9",
            }}
          >
            Descubra como craftar mais de 1200 itens do Minecraft
          </p>
        </div>

        {/* Creative Inventory Interface */}
        <div
          className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-5 lg:gap-5 max-w-7xl mx-auto px-4 lg:px-0"
          style={{
            display: window.innerWidth >= 1024 ? "flex" : "flex",
            justifyContent: window.innerWidth >= 1024 ? "center" : "center",
            alignItems: window.innerWidth >= 1024 ? "flex-start" : "center",
            gap: window.innerWidth >= 1024 ? "20px" : "20px",
            maxWidth: window.innerWidth >= 1024 ? "1200px" : "100%",
            margin: "0 auto",
            flexDirection: window.innerWidth >= 1024 ? "row" : "column",
          }}
        >
          {/* Left Panel - Items Inventory */}
          <div
            className="w-full max-w-md lg:max-w-none"
            style={{
              background: "#C6C6C6",
              border: "2px solid",
              borderColor: "#DFDFDF #8F8F8F #8F8F8F #DFDFDF",
              borderRadius: "4px",
              padding: "12px",
              width: window.innerWidth >= 1024 ? "500px" : "100%",
              maxWidth: window.innerWidth >= 1024 ? "500px" : "500px",
              height: window.innerWidth >= 1024 ? "490px" : "auto",
              minHeight: window.innerWidth >= 1024 ? "490px" : "320px",
              boxShadow:
                "inset 1px 1px 0px rgba(255, 255, 255, 0.6), inset -1px -1px 0px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Category Tabs with integrated search */}
            <div
              style={{
                display: "flex",
                marginBottom: "8px",
                gap: "8px",
                alignItems: "center",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {/* Category buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "1px",
                }}
              >
                {Object.entries(categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => {
                      playClickSound();
                      if (key === "search") {
                        setShowSearch(!showSearch);
                        if (!showSearch) {
                          setActiveTab(key);
                        } else {
                          setActiveTab("blocks");
                          setSearchTerm("");
                        }
                      } else {
                        setActiveTab(key);
                        setShowSearch(false);
                        setSearchTerm("");
                      }
                    }}
                    style={{
                      width: "56px",
                      height: "56px",
                      backgroundImage: `url(${quadradoGrid})`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      imageRendering: "pixelated",
                      filter:
                        activeTab === key || (key === "search" && showSearch)
                          ? "brightness(1.2)"
                          : "brightness(1)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Minecraft', monospace",
                      padding: "6px",
                      transition: "filter 0.1s ease",
                    }}
                  >
                    <img
                      src={category.icon}
                      alt={category.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        imageRendering: "pixelated",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Items Label / Search Input */}
            {showSearch ? (
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: "#9F9F9F",
                  padding: "6px 12px",
                  marginBottom: "8px",
                  border: "1px solid",
                  borderColor: "#6F6F6F #DFDFDF #DFDFDF #6F6F6F",
                  borderRadius: "2px",
                  fontSize: "18px",
                  fontFamily: "'Minecraft', monospace",
                  color: "#FFFFFF",
                  textShadow: "1px 1px 0px #000000",
                  fontWeight: "bold",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                autoFocus
              />
            ) : (
              <div
                style={{
                  padding: "6px 12px",
                  marginBottom: "8px",
                  fontSize: "20px",
                  fontFamily: "'Minecraft', monospace",
                  color: "#404040",
                  fontWeight: "normal",
                }}
              >
                {categories[activeTab]?.name || "Itens"}
              </div>
            )}

            {/* Items Grid */}
            <div
              style={{
                background: "#8F8F8F",
                border: "2px solid",
                borderColor: "#5F5F5F #BFBFBF #BFBFBF #5F5F5F",
                borderRadius: "3px",
                padding: "12px",
                height: "240px",
                overflowY: "auto",
              }}
            >
              <div
                className="grid gap-1 justify-center items-center"
                style={{
                  display: "grid",
                  gridTemplateColumns: window.innerWidth >= 1024 ? "repeat(8, 52px)" : window.innerWidth < 640 ? "repeat(4, 52px)" : window.innerWidth < 768 ? "repeat(6, 52px)" : "repeat(8, 52px)",
                  gap: "1px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id !== undefined ? item.id : index}
                    onClick={() => handleItemClick(item, index)}
                    style={{
                      width: "52px",
                      height: "52px",
                      backgroundImage: `url(${quadradoGrid})`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      imageRendering: "pixelated",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.1s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "brightness(1.1)";
                      e.currentTarget.style.transform = "scale(1.05)";
                      handleItemHover(item, e);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "brightness(1)";
                      e.currentTarget.style.transform = "scale(1)";
                      handleItemLeave();
                    }}
                  >
                    {item.texture && (
                      <img
                        src={item.texture}
                        alt={item.readable}
                        style={{
                          width: "34px",
                          height: "34px",
                          imageRendering: "pixelated",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Crafting and Player Inventory */}
          <div
            className="w-full max-w-md lg:max-w-none"
            style={{
              background: "#C6C6C6",
              border: "2px solid",
              borderColor: "#DFDFDF #8F8F8F #8F8F8F #DFDFDF",
              borderRadius: "4px",
              padding: "12px",
              width: window.innerWidth >= 1024 ? "500px" : "100%",
              maxWidth: window.innerWidth >= 1024 ? "500px" : "500px",
              height: window.innerWidth >= 1024 ? "490px" : "auto",
              minHeight: window.innerWidth >= 1024 ? "490px" : "320px",
              boxShadow:
                "inset 1px 1px 0px rgba(255, 255, 255, 0.6), inset -1px -1px 0px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Crafting Area Label */}
            <div
              style={{
                padding: "8px 16px",
                marginBottom: "12px",
                fontSize: "20px",
                fontFamily: "'Minecraft', monospace",
                color: "#404040",
                textAlign: "left",
                fontWeight: "normal",
              }}
            >
              Criando
            </div>

            {/* Crafting Content */}
            <div
              style={{
                padding: "16px",
                marginBottom: "16px",
                minHeight: "180px",
              }}
            >
              {selectedItem ? (
                recipes.length > 0 ? (
                  /* Crafting with Selected Item */
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "20px",
                    }}
                  >
                    {/* 3x3 Crafting Grid */}
                    <div
                      style={{
                        position: "relative",
                        width: "150px",
                        height: "150px",
                        backgroundImage: `url(${criacaoGrid})`,
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        imageRendering: "pixelated",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 48px)",
                        gap: "3px",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "3px",
                      }}
                    >
                      {(() => {
                        const recipe = normalizeRecipeShape(animatedRecipe);
                        const shape =
                          recipe?.inShape ||
                          Array(3)
                            .fill(null)
                            .map(() => Array(3).fill(null));

                        return shape
                          .map((row, rowIndex) =>
                            row.map((itemId, colIndex) => {
                              const item = itemId ? getItemById(itemId) : null;
                              const slotIndex = rowIndex * 3 + colIndex;
                              return (
                                <div
                                  key={slotIndex}
                                  style={{
                                    width: "38px",
                                    height: "38px",
                                    background: "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  onMouseEnter={(e) => {
                                    if (item) {
                                      handleItemHover(item, e);
                                    }
                                  }}
                                  onMouseLeave={handleItemLeave}
                                >
                                  {item?.texture && (
                                    <img
                                      src={item.texture}
                                      alt={item.readable}
                                      style={{
                                        width: "28px",
                                        height: "28px",
                                        imageRendering: "pixelated",
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            })
                          )
                          .flat();
                      })()}
                    </div>

                    {/* Arrow */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={cetaIcon}
                        alt="Arrow"
                        style={{
                          width: "72px",
                          height: "48px",
                          imageRendering: "pixelated",
                        }}
                      />
                    </div>

                    {/* Result Slot */}
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        backgroundImage: `url(${quadradoGrid})`,
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        imageRendering: "pixelated",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedItem) {
                          handleItemHover(selectedItem, e);
                        }
                      }}
                      onMouseLeave={handleItemLeave}
                    >
                      {selectedItem?.texture && (
                        <img
                          src={selectedItem.texture}
                          alt={selectedItem.readable}
                          style={{
                            width: "28px",
                            height: "28px",
                            imageRendering: "pixelated",
                          }}
                        />
                      )}
                      {animatedRecipe?.result?.count > 1 && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: "-2px",
                            right: "-2px",
                            background: "#5F5F5F",
                            color: "#FFFFFF",
                            fontSize: "10px",
                            fontWeight: "bold",
                            padding: "2px 4px",
                            borderRadius: "2px",
                            minWidth: "12px",
                            textAlign: "center",
                          }}
                        >
                          {animatedRecipe.result.count}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* No Craft Available Message */
                  (() => {
                    const specialInfo = getSpecialCraftingInfo(
                      selectedItem.id,
                      selectedItem.readable || selectedItem.name
                    );

                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          gap: "16px",
                        }}
                      >
                        {/* Selected Item Display */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "38px",
                              height: "38px",
                              backgroundImage: `url(${quadradoGrid})`,
                              backgroundSize: "100% 100%",
                              backgroundRepeat: "no-repeat",
                              imageRendering: "pixelated",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {selectedItem?.texture && (
                              <img
                                src={selectedItem.texture}
                                alt={selectedItem.readable}
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  imageRendering: "pixelated",
                                }}
                              />
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontFamily: "'Minecraft', monospace",
                              color: "#FFFFFF",
                              textShadow: "1px 1px 0px #000000",
                              fontWeight: "bold",
                            }}
                          >
                            {selectedItem.readable || selectedItem.name}
                          </div>
                        </div>

                        {/* Special Crafting Info or No Craft Message */}
                        {specialInfo ? (
                          <div
                            style={{
                              background: "#FF8C00",
                              border: "2px solid",
                              borderColor: "#FFB84D #CC5500 #CC5500 #FFB84D",
                              borderRadius: "4px",
                              padding: "12px 20px",
                              fontSize: "12px",
                              fontFamily: "'Minecraft', monospace",
                              color: "#FFFFFF",
                              textShadow: "1px 1px 0px #000000",
                              fontWeight: "bold",
                              textAlign: "center",
                              boxShadow:
                                "inset 1px 1px 0px rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            {specialInfo.message}
                            <div
                              style={{
                                fontSize: "10px",
                                marginTop: "4px",
                                opacity: "0.9",
                                fontWeight: "normal",
                              }}
                            >
                              {specialInfo.description}
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              background: "#DC143C",
                              border: "2px solid",
                              borderColor: "#FF6B6B #8B0000 #8B0000 #FF6B6B",
                              borderRadius: "4px",
                              padding: "12px 20px",
                              fontSize: "12px",
                              fontFamily: "'Minecraft', monospace",
                              color: "#FFFFFF",
                              textShadow: "1px 1px 0px #000000",
                              fontWeight: "bold",
                              textAlign: "center",
                              boxShadow:
                                "inset 1px 1px 0px rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            CRAFT NÃO DISPONÍVEL
                            <div
                              style={{
                                fontSize: "10px",
                                marginTop: "4px",
                                opacity: "0.9",
                                fontWeight: "normal",
                              }}
                            >
                              Este item não pode ser craftado
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()
                )
              ) : (
                /* Default Crafting Grid */
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  {/* 3x3 Crafting Grid */}
                  <div
                    style={{
                      position: "relative",
                      width: "120px",
                      height: "120px",
                      backgroundImage: `url(${criacaoGrid})`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      imageRendering: "pixelated",
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 38px)",
                      gap: "2px",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2px",
                    }}
                  >
                    {Array(9)
                      .fill(null)
                      .map((_, index) => (
                        <div
                          key={index}
                          style={{
                            width: "38px",
                            height: "38px",
                            background: "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/* Empty slot */}
                        </div>
                      ))}
                  </div>

                  {/* Arrow */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={cetaIcon}
                      alt="Arrow"
                      style={{
                        width: "72px",
                        height: "48px",
                        imageRendering: "pixelated",
                      }}
                    />
                  </div>

                  {/* Result Slot */}
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      backgroundImage: `url(${quadradoGrid})`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      imageRendering: "pixelated",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Result will appear here */}
                  </div>
                </div>
              )}
            </div>

            {/* Player Inventory - Hidden on mobile */}
            <div className="hidden lg:block">
              <div
                style={{
                  padding: "8px 16px",
                  marginBottom: "-8px",
                  fontSize: "20px",
                  fontFamily: "'Minecraft', monospace",
                  color: "#404040",
                  textAlign: "left",
                  fontWeight: "normal",
                }}
              >
                Inventário
              </div>

              <div
                style={{
                  padding: "0px 12px 12px 12px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "450px",
                    height: "155px",
                    backgroundImage: `url(${inventarioGrid})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    imageRendering: "pixelated",
                    display: "grid",
                    gridTemplateColumns: "repeat(9, 48px)",
                    gridTemplateRows: "repeat(3, 48px)",
                    gap: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "3px",
                    margin: "0 auto",
                  }}
                >
                  {(() => {
                    // Itens específicos para o inventário
                    const inventoryItems = [
                      // Primeira linha
                      { item: craftableItems.find(item => item.name === 'diamond' || item.readable?.toLowerCase() === 'diamante'), slot: 0 },
                      { item: craftableItems.find(item => item.name === 'netherite_sword' || item.readable?.toLowerCase().includes('espada') && item.readable?.toLowerCase().includes('netherite')), slot: 1 },
                      { item: craftableItems.find(item => item.name === 'diamond' || item.readable?.toLowerCase() === 'diamante'), slot: 4 },
                      { item: craftableItems.find(item => item.name?.includes('cookie') || item.readable?.toLowerCase().includes('biscoito')), slot: 5 },
                      { item: craftableItems.find(item => item.name?.includes('player_head') || item.name?.includes('skull') || item.readable?.toLowerCase().includes('cabeça')), slot: 8 },

                      // Segunda linha
                      { item: craftableItems.find(item => item.name?.includes('stick') || item.readable?.toLowerCase().includes('graveto')), slot: 11 },
                      { item: craftableItems.find(item => item.name === 'diamond' || item.readable?.toLowerCase() === 'diamante'), slot: 13 },
                      { item: craftableItems.find(item => item.name?.includes('stick') || item.readable?.toLowerCase().includes('graveto')), slot: 16 },
                      { item: craftableItems.find(item => item.name?.includes('stick') || item.readable?.toLowerCase().includes('graveto')), slot: 17 },

                      // Terceira linha
                      { item: craftableItems.find(item => item.name === 'diamond' || item.readable?.toLowerCase() === 'diamante'), slot: 20 },
                      { item: craftableItems.find(item => item.name?.includes('stick') || item.readable?.toLowerCase().includes('graveto')), slot: 26 },
                    ].filter(item => item.item); // Remove itens não encontrados

                    return Array(27)
                      .fill(null)
                      .map((_, index) => {
                        const inventoryItem = inventoryItems.find(inv => inv.slot === index);
                        const item = inventoryItem ? inventoryItem.item : null;

                        return (
                          <div
                            key={index}
                            style={{
                              width: "48px",
                              height: "48px",
                              background: "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onMouseEnter={(e) => {
                              if (item) {
                                handleItemHover(item, e);
                              }
                            }}
                            onMouseLeave={handleItemLeave}
                          >
                            {item?.texture && (
                              <img
                                src={item.texture}
                                alt={item.readable}
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  imageRendering: "pixelated",
                                }}
                              />
                            )}
                          </div>
                        );
                      });
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredItem && (
        <div
          style={{
            position: "fixed",
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            background: "#1E1E1E",
            border: "2px solid #565656",
            borderRadius: "4px",
            padding: "6px 10px",
            fontSize: "14px",
            fontFamily: "'Minecraft', monospace",
            color: "#FFFFFF",
            textShadow: "1px 1px 0px #000000",
            fontWeight: "bold",
            zIndex: 1000,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          {hoveredItem.readable || hoveredItem.name}
        </div>
      )}

      <HelpCard
        title="O QUE É O GUIA DE CRAFT?"
        content="Este guia mostra receitas da MESA DE CRAFTING do Minecraft. Alguns itens precisam de outros equipamentos especiais como Fornalha (lingots, vidro), Mesa de Ferraria (netherite), Suporte de Poções (poções) ou Mesa de Encantamento (itens encantados). Quando não aparece receita, o item pode precisar desses equipamentos especiais ou ser um drop natural!"
      />

      {/* Terra transition - Desktop only */}
      <div className="hidden md:block">
        <img
          className="pointer-events-none absolute left-0 w-full block z-[100] -top-2 scale-[2]"
          src={terraTransition}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
};

export default CraftSection;
