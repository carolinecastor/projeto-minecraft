import { useState, useEffect, useMemo } from "react";
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
import ErrorBoundary from "../ErrorBoundary";

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
    try {
      playClickSound();

      // Validate item data
      if (!item || typeof item !== "object") {
        console.warn("Invalid item data:", item);
        return;
      }

      const itemWithId = {
        ...item,
        id: item.id !== undefined ? item.id : index,
        readable: item.readable || item.name || "Item Desconhecido",
      };

      setSelectedItem(itemWithId);
      setSelectedRecipeIndex(0);
      setAnimationIndex(0);
    } catch (error) {
      console.error("Error selecting item:", error);
      // Reset state on error
      setSelectedItem(null);
      setSelectedRecipeIndex(0);
      setAnimationIndex(0);
    }
  };

  const recipes = useMemo(() => {
    try {
      if (!selectedItem || !selectedItem.id) return [];
      const recipeList = getRecipesByItemId(selectedItem.id.toString());
      return Array.isArray(recipeList) ? recipeList : [];
    } catch (error) {
      console.error("Error getting recipes:", error);
      return [];
    }
  }, [selectedItem]);

  const currentRecipe = useMemo(() => {
    try {
      return recipes[selectedRecipeIndex] || null;
    } catch (error) {
      console.error("Error getting current recipe:", error);
      return null;
    }
  }, [recipes, selectedRecipeIndex]);

  // Sistema de animação para receitas múltiplas (efeito GIF)
  useEffect(() => {
    try {
      if (recipes && recipes.length > 1) {
        const interval = setInterval(() => {
          setAnimationIndex((prevIndex) => {
            try {
              return (prevIndex + 1) % recipes.length;
            } catch (error) {
              console.error("Error in animation index calculation:", error);
              return 0;
            }
          });
        }, 3000);
        return () => clearInterval(interval);
      }
    } catch (error) {
      console.error("Error setting up animation:", error);
    }
  }, [recipes?.length]);

  const animatedRecipe = useMemo(() => {
    try {
      if (!recipes || recipes.length === 0) return null;
      if (recipes.length > 1 && animationIndex < recipes.length) {
        return recipes[animationIndex];
      }
      return currentRecipe;
    } catch (error) {
      console.error("Error getting animated recipe:", error);
      return null;
    }
  }, [recipes, animationIndex, currentRecipe]);

  const handleItemHover = (item, e) => {
    try {
      if (!item || !e || !e.currentTarget) return;

      setHoveredItem(item);
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: Math.max(0, rect.right + 10),
        y: Math.max(0, rect.top + rect.height - 10),
      });
    } catch (error) {
      console.error("Error handling item hover:", error);
      setHoveredItem(null);
    }
  };

  const handleItemLeave = () => {
    try {
      setHoveredItem(null);
    } catch (error) {
      console.error("Error handling item leave:", error);
    }
  };

  return (
    <ErrorBoundary
      onReset={() => {
        setSelectedItem(null);
        setSelectedRecipeIndex(0);
        setAnimationIndex(0);
        setSearchTerm("");
        setActiveTab("blocks");
        setShowSearch(false);
        setHoveredItem(null);
      }}
    >
      <section
        id="craft"
        className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 overflow-hidden -mt-4"
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

        <div className="absolute inset-0 -top-12">
          <img src={terraTransition} alt="" className="w-full block" />
        </div>

        {/* Craft Guide Content */}
        <div className="relative z-10 w-full max-w-7xl mt-8 sm:mt-12 lg:mt-16 xl:mt-20 px-2 sm:px-4">
          {/* Minecraft-style Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-5 tracking-wider uppercase"
              style={{
                textShadow: "2px 2px 0px #000000",
              }}
            >
              MESA DE TRABALHO
            </h1>
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-medium opacity-90 m-0">
              Descubra como craftar mais de 1200 itens do Minecraft
            </p>
          </div>

          {/* Creative Inventory Interface */}
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 lg:gap-5 max-w-7xl mx-auto px-2 sm:px-4">
            {/* Left Panel - Items Inventory */}
            <div
              className="w-full max-w-md lg:max-w-lg xl:w-[500px] order-1 lg:order-none"
              style={{
                background: "#C6C6C6",
                border: "2px solid",
                borderColor: "#DFDFDF #8F8F8F #8F8F8F #DFDFDF",
                borderRadius: "4px",
                padding: "12px",
                height: "490px",
                boxShadow:
                  "inset 1px 1px 0px rgba(255, 255, 255, 0.6), inset -1px -1px 0px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Category Tabs with integrated search */}
              <div className="flex flex-wrap sm:flex-nowrap mb-2 gap-1 sm:gap-2 items-center overflow-hidden w-full">
                {/* Category buttons */}
                <div className="flex gap-px flex-wrap sm:flex-nowrap">
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
                      className="w-12 h-12 sm:w-14 sm:h-14 cursor-pointer flex items-center justify-center p-1 sm:p-1.5 transition-all duration-100"
                      style={{
                        backgroundImage: `url(${quadradoGrid})`,
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        imageRendering: "pixelated",
                        filter:
                          activeTab === key || (key === "search" && showSearch)
                            ? "brightness(1.2)"
                            : "brightness(1)",
                        fontFamily: "'Minecraft', monospace",
                      }}
                    >
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                        style={{
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
                className="overflow-y-auto h-[340px] p-2 sm:p-3"
                style={{
                  background: "#8F8F8F",
                  border: "2px solid",
                  borderColor: "#5F5F5F #BFBFBF #BFBFBF #5F5F5F",
                  borderRadius: "3px",
                }}
              >
                <div
                  className="grid grid-cols-6 sm:grid-cols-7 lg:grid-cols-8 gap-px justify-center items-center"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(44px, 52px))",
                  }}
                >
                  <ErrorBoundary>
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
                          try {
                            if (e?.currentTarget) {
                              e.currentTarget.style.filter = "brightness(1.1)";
                              e.currentTarget.style.transform = "scale(1.05)";
                            }
                            handleItemHover(item, e);
                          } catch (error) {
                            console.error("Error in item hover effect:", error);
                          }
                        }}
                        onMouseLeave={(e) => {
                          try {
                            if (e?.currentTarget) {
                              e.currentTarget.style.filter = "brightness(1)";
                              e.currentTarget.style.transform = "scale(1)";
                            }
                            handleItemLeave();
                          } catch (error) {
                            console.error("Error in item leave effect:", error);
                          }
                        }}
                      >
                        {item?.texture && (
                          <img
                            src={item.texture}
                            alt={item.readable || item.name || "Item"}
                            style={{
                              width: "34px",
                              height: "34px",
                              imageRendering: "pixelated",
                            }}
                            onError={(e) => {
                              console.warn(
                                "Failed to load item texture:",
                                item.texture
                              );
                              e.target.style.display = "none";
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </ErrorBoundary>
                </div>
              </div>
            </div>

            {/* Right Panel - Crafting and Player Inventory */}
            <div
              className="w-full max-w-md lg:max-w-lg xl:w-[500px] order-2 lg:order-none h-auto min-h-[300px] lg:h-[490px]"
              style={{
                background: "#C6C6C6",
                border: "2px solid",
                borderColor: "#DFDFDF #8F8F8F #8F8F8F #DFDFDF",
                borderRadius: "4px",
                padding: "12px",
                boxShadow:
                  "inset 1px 1px 0px rgba(255, 255, 255, 0.6), inset -1px -1px 0px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Crafting Area Label */}
              <div
                style={{
                  padding: "8px 16px",
                  marginLeft: "8px",
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
                <ErrorBoundary>
                  {selectedItem ? (
                    recipes.length > 0 ? (
                      /* Crafting with Selected Item */
                      <div className="flex flex-row items-center justify-center gap-3 sm:gap-5">
                        {/* 3x3 Crafting Grid */}
                        <div
                          className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-[150px] lg:h-[150px] grid grid-cols-3 gap-1 justify-center items-center p-1"
                          style={{
                            backgroundImage: `url(${criacaoGrid})`,
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            imageRendering: "pixelated",
                          }}
                        >
                          {(() => {
                            try {
                              if (!animatedRecipe) {
                                return Array(9)
                                  .fill(null)
                                  .map((_, index) => (
                                    <div
                                      key={index}
                                      className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-transparent flex items-center justify-center"
                                    />
                                  ));
                              }

                              const recipe =
                                normalizeRecipeShape(animatedRecipe);
                              if (!recipe) {
                                console.warn(
                                  "Failed to normalize recipe:",
                                  animatedRecipe
                                );
                                return Array(9)
                                  .fill(null)
                                  .map((_, index) => (
                                    <div
                                      key={index}
                                      className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-transparent flex items-center justify-center"
                                    />
                                  ));
                              }

                              const shape =
                                recipe?.inShape ||
                                Array(3)
                                  .fill(null)
                                  .map(() => Array(3).fill(null));

                              return shape
                                .map((row, rowIndex) => {
                                  if (!Array.isArray(row)) return null;
                                  return row.map((itemId, colIndex) => {
                                    try {
                                      const item = itemId
                                        ? getItemById(itemId)
                                        : null;
                                      const slotIndex = rowIndex * 3 + colIndex;
                                      return (
                                        <div
                                          key={slotIndex}
                                          className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-transparent flex items-center justify-center"
                                          onMouseEnter={(e) => {
                                            try {
                                              if (item) {
                                                handleItemHover(item, e);
                                              }
                                            } catch (error) {
                                              console.error(
                                                "Error in item hover:",
                                                error
                                              );
                                            }
                                          }}
                                          onMouseLeave={handleItemLeave}
                                        >
                                          {item?.texture && (
                                            <img
                                              src={item.texture}
                                              alt={item.readable || "Item"}
                                              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                                              style={{
                                                imageRendering: "pixelated",
                                              }}
                                              onError={(e) => {
                                                console.warn(
                                                  "Failed to load texture:",
                                                  item.texture
                                                );
                                                e.target.style.display = "none";
                                              }}
                                            />
                                          )}
                                        </div>
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Error rendering recipe slot:",
                                        error
                                      );
                                      return (
                                        <div
                                          key={rowIndex * 3 + colIndex}
                                          className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-transparent flex items-center justify-center"
                                        />
                                      );
                                    }
                                  });
                                })
                                .filter(Boolean)
                                .flat();
                            } catch (error) {
                              console.error(
                                "Error rendering recipe grid:",
                                error
                              );
                              return Array(9)
                                .fill(null)
                                .map((_, index) => (
                                  <div
                                    key={index}
                                    className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-transparent flex items-center justify-center"
                                  />
                                ));
                            }
                          })()}
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center">
                          <img
                            src={cetaIcon}
                            alt="Arrow"
                            className="w-14 h-8 sm:w-16 sm:h-10 lg:w-18 lg:h-12"
                            style={{
                              imageRendering: "pixelated",
                            }}
                          />
                        </div>

                        {/* Result Slot */}
                        <div
                          className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 flex items-center justify-center relative"
                          style={{
                            backgroundImage: `url(${quadradoGrid})`,
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            imageRendering: "pixelated",
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
                              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                              style={{
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
                        let specialInfo = null;
                        try {
                          if (
                            selectedItem?.id &&
                            (selectedItem.readable || selectedItem.name)
                          ) {
                            specialInfo = getSpecialCraftingInfo(
                              selectedItem.id,
                              selectedItem.readable || selectedItem.name
                            );
                          }
                        } catch (error) {
                          console.error(
                            "Error getting special crafting info:",
                            error
                          );
                          specialInfo = null;
                        }

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
                                  width: "48px",
                                  height: "48px",
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
                                      width: "32px",
                                      height: "32px",
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
                                  borderColor:
                                    "#FFB84D #CC5500 #CC5500 #FFB84D",
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
                                  borderColor:
                                    "#FF6B6B #8B0000 #8B0000 #FF6B6B",
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
                    <div className="flex sm:flex-row items-center justify-center gap-3 sm:gap-5">
                      {/* 3x3 Crafting Grid */}
                      <div
                        className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-[150px] lg:h-[150px] grid grid-cols-3 gap-1 justify-center items-center p-1"
                        style={{
                          backgroundImage: `url(${criacaoGrid})`,
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                          imageRendering: "pixelated",
                        }}
                      >
                        {Array(9)
                          .fill(null)
                          .map((_, index) => (
                            <div
                              key={index}
                              className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-transparent flex items-center justify-center"
                            >
                              {/* Empty slot */}
                            </div>
                          ))}
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center justify-center">
                        <img
                          src={cetaIcon}
                          alt="Arrow"
                          className="w-14 h-8 sm:w-16 sm:h-10 lg:w-18 lg:h-12"
                          style={{
                            imageRendering: "pixelated",
                          }}
                        />
                      </div>

                      {/* Result Slot */}
                      <div
                        className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 flex items-center justify-center"
                        style={{
                          backgroundImage: `url(${quadradoGrid})`,
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                          imageRendering: "pixelated",
                        }}
                      >
                        {/* Result will appear here */}
                      </div>
                    </div>
                  )}
                </ErrorBoundary>
              </div>

              {/* Player Inventory Label */}
              <div
                className="hidden lg:block"
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

              {/* Player Inventory Grid */}
              <div className="hidden lg:block px-2 sm:px-3 pb-3">
                <div
                  className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md xl:w-[450px] h-32 sm:h-36 lg:h-[155px] grid grid-cols-9 grid-rows-3 gap-px justify-center items-center p-1 mx-auto"
                  style={{
                    backgroundImage: `url(${inventarioGrid})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    imageRendering: "pixelated",
                  }}
                >
                  {(() => {
                    // Itens específicos para o inventário
                    const inventoryItems = [
                      // Primeira linha
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name === "diamond" ||
                            item.readable?.toLowerCase() === "diamante"
                        ),
                        slot: 0,
                      },
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name === "netherite_sword" ||
                            (item.readable?.toLowerCase().includes("espada") &&
                              item.readable
                                ?.toLowerCase()
                                .includes("netherite"))
                        ),
                        slot: 1,
                      },
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name === "diamond" ||
                            item.readable?.toLowerCase() === "diamante"
                        ),
                        slot: 4,
                      },
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name?.includes("cookie") ||
                            item.readable?.toLowerCase().includes("biscoito")
                        ),
                        slot: 5,
                      },
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name?.includes("player_head") ||
                            item.name?.includes("skull") ||
                            item.readable?.toLowerCase().includes("cabeça")
                        ),
                        slot: 8,
                      },

                      // Segunda linha
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name?.includes("stick") ||
                            item.readable?.toLowerCase().includes("graveto")
                        ),
                        slot: 11,
                      },
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name === "diamond" ||
                            item.readable?.toLowerCase() === "diamante"
                        ),
                        slot: 13,
                      },
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name?.includes("stick") ||
                            item.readable?.toLowerCase().includes("graveto")
                        ),
                        slot: 16,
                      },
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name?.includes("stick") ||
                            item.readable?.toLowerCase().includes("graveto")
                        ),
                        slot: 17,
                      },

                      // Terceira linha
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name === "diamond" ||
                            item.readable?.toLowerCase() === "diamante"
                        ),
                        slot: 20,
                      },
                      {
                        item: craftableItems.find(
                          (item) =>
                            item.name?.includes("stick") ||
                            item.readable?.toLowerCase().includes("graveto")
                        ),
                        slot: 26,
                      },
                    ].filter((item) => item.item); // Remove itens não encontrados

                    return Array(27)
                      .fill(null)
                      .map((_, index) => {
                        const inventoryItem = inventoryItems.find(
                          (inv) => inv.slot === index
                        );
                        const item = inventoryItem ? inventoryItem.item : null;

                        return (
                          <div
                            key={index}
                            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-transparent flex items-center justify-center"
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
                                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                                style={{
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

        {/* Tooltip */}
        {hoveredItem && (
          <div
            className="fixed z-[1000] pointer-events-none whitespace-nowrap text-xs sm:text-sm font-bold text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded shadow-lg"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              background: "#1E1E1E",
              border: "2px solid #565656",
              fontFamily: "'Minecraft', monospace",
              textShadow: "1px 1px 0px #000000",
            }}
          >
            {hoveredItem.readable || hoveredItem.name}
          </div>
        )}

        <HelpCard
          title="O QUE É O GUIA DE CRAFT?"
          content="Este guia mostra receitas da MESA DE CRAFTING do Minecraft. Alguns itens precisam de outros equipamentos especiais como Fornalha (lingots, vidro), Mesa de Ferraria (netherite), Suporte de Poções (poções) ou Mesa de Encantamento (itens encantados). Quando não aparece receita, o item pode precisar desses equipamentos especiais ou ser um drop natural!"
          position="fixed top-2 right-2 sm:top-44 sm:right-4"
        />

        {/* <img
          className="pointer-events-none absolute left-0 w-full block z-[100] -top-13"
          src={terraTransition}
          alt=""
          loading="lazy"
          decoding="async"
        /> */}
      </section>
    </ErrorBoundary>
  );
};

export default CraftSection;
