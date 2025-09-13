import recipes from "../assets/craft/recipes.json";
import itemsData from "../assets/craft/items.json";

Object.freeze(recipes);
Object.freeze(itemsData);

const COLOR_VARIANTS = {
  wool: [
    { id: 180, name: "white_wool", readable: "White Wool" },
    { id: 181, name: "orange_wool", readable: "Orange Wool" },
    { id: 182, name: "magenta_wool", readable: "Magenta Wool" },
    { id: 183, name: "light_blue_wool", readable: "Light Blue Wool" },
    { id: 184, name: "yellow_wool", readable: "Yellow Wool" },
    { id: 185, name: "lime_wool", readable: "Lime Wool" },
    { id: 186, name: "pink_wool", readable: "Pink Wool" },
    { id: 187, name: "gray_wool", readable: "Gray Wool" },
    { id: 188, name: "light_gray_wool", readable: "Light Gray Wool" },
    { id: 189, name: "cyan_wool", readable: "Cyan Wool" },
    { id: 190, name: "purple_wool", readable: "Purple Wool" },
    { id: 191, name: "blue_wool", readable: "Blue Wool" },
    { id: 192, name: "brown_wool", readable: "Brown Wool" },
    { id: 193, name: "green_wool", readable: "Green Wool" },
    { id: 194, name: "red_wool", readable: "Red Wool" },
    { id: 195, name: "black_wool", readable: "Black Wool" },
  ],
  bed: [
    { id: 924, name: "white_bed", readable: "White Bed" },
    { id: 925, name: "orange_bed", readable: "Orange Bed" },
    { id: 926, name: "magenta_bed", readable: "Magenta Bed" },
    { id: 927, name: "light_blue_bed", readable: "Light Blue Bed" },
    { id: 928, name: "yellow_bed", readable: "Yellow Bed" },
    { id: 929, name: "lime_bed", readable: "Lime Bed" },
    { id: 930, name: "pink_bed", readable: "Pink Bed" },
    { id: 931, name: "gray_bed", readable: "Gray Bed" },
    { id: 932, name: "light_gray_bed", readable: "Light Gray Bed" },
    { id: 933, name: "cyan_bed", readable: "Cyan Bed" },
    { id: 934, name: "purple_bed", readable: "Purple Bed" },
    { id: 935, name: "blue_bed", readable: "Blue Bed" },
    { id: 936, name: "brown_bed", readable: "Brown Bed" },
    { id: 937, name: "green_bed", readable: "Green Bed" },
    { id: 938, name: "red_bed", readable: "Red Bed" },
    { id: 939, name: "black_bed", readable: "Black Bed" },
  ],
  carpet: [
    { id: 424, name: "white_carpet", readable: "White Carpet" },
    { id: 425, name: "orange_carpet", readable: "Orange Carpet" },
    { id: 426, name: "magenta_carpet", readable: "Magenta Carpet" },
    { id: 427, name: "light_blue_carpet", readable: "Light Blue Carpet" },
    { id: 428, name: "yellow_carpet", readable: "Yellow Carpet" },
    { id: 429, name: "lime_carpet", readable: "Lime Carpet" },
    { id: 430, name: "pink_carpet", readable: "Pink Carpet" },
    { id: 431, name: "gray_carpet", readable: "Gray Carpet" },
    { id: 432, name: "light_gray_carpet", readable: "Light Gray Carpet" },
    { id: 433, name: "cyan_carpet", readable: "Cyan Carpet" },
    { id: 434, name: "purple_carpet", readable: "Purple Carpet" },
    { id: 435, name: "blue_carpet", readable: "Blue Carpet" },
    { id: 436, name: "brown_carpet", readable: "Brown Carpet" },
    { id: 437, name: "green_carpet", readable: "Green Carpet" },
    { id: 438, name: "red_carpet", readable: "Red Carpet" },
    { id: 439, name: "black_carpet", readable: "Black Carpet" },
  ],
  terracotta: [
    { id: 405, name: "white_terracotta", readable: "White Terracotta" },
    { id: 406, name: "orange_terracotta", readable: "Orange Terracotta" },
    { id: 407, name: "magenta_terracotta", readable: "Magenta Terracotta" },
    {
      id: 408,
      name: "light_blue_terracotta",
      readable: "Light Blue Terracotta",
    },
    { id: 409, name: "yellow_terracotta", readable: "Yellow Terracotta" },
    { id: 410, name: "lime_terracotta", readable: "Lime Terracotta" },
    { id: 411, name: "pink_terracotta", readable: "Pink Terracotta" },
    { id: 412, name: "gray_terracotta", readable: "Gray Terracotta" },
    {
      id: 413,
      name: "light_gray_terracotta",
      readable: "Light Gray Terracotta",
    },
    { id: 414, name: "cyan_terracotta", readable: "Cyan Terracotta" },
    { id: 415, name: "purple_terracotta", readable: "Purple Terracotta" },
    { id: 416, name: "blue_terracotta", readable: "Blue Terracotta" },
    { id: 417, name: "brown_terracotta", readable: "Brown Terracotta" },
    { id: 418, name: "green_terracotta", readable: "Green Terracotta" },
    { id: 419, name: "red_terracotta", readable: "Red Terracotta" },
    { id: 420, name: "black_terracotta", readable: "Black Terracotta" },
  ],
  concrete_powder: [
    {
      id: 549,
      name: "white_concrete_powder",
      readable: "White Concrete Powder",
    },
    {
      id: 550,
      name: "orange_concrete_powder",
      readable: "Orange Concrete Powder",
    },
    {
      id: 551,
      name: "magenta_concrete_powder",
      readable: "Magenta Concrete Powder",
    },
    {
      id: 552,
      name: "light_blue_concrete_powder",
      readable: "Light Blue Concrete Powder",
    },
    {
      id: 553,
      name: "yellow_concrete_powder",
      readable: "Yellow Concrete Powder",
    },
    { id: 554, name: "lime_concrete_powder", readable: "Lime Concrete Powder" },
    { id: 555, name: "pink_concrete_powder", readable: "Pink Concrete Powder" },
    { id: 556, name: "gray_concrete_powder", readable: "Gray Concrete Powder" },
    {
      id: 557,
      name: "light_gray_concrete_powder",
      readable: "Light Gray Concrete Powder",
    },
    { id: 558, name: "cyan_concrete_powder", readable: "Cyan Concrete Powder" },
    {
      id: 559,
      name: "purple_concrete_powder",
      readable: "Purple Concrete Powder",
    },
    { id: 560, name: "blue_concrete_powder", readable: "Blue Concrete Powder" },
    {
      id: 561,
      name: "brown_concrete_powder",
      readable: "Brown Concrete Powder",
    },
    {
      id: 562,
      name: "green_concrete_powder",
      readable: "Green Concrete Powder",
    },
    { id: 563, name: "red_concrete_powder", readable: "Red Concrete Powder" },
    {
      id: 564,
      name: "black_concrete_powder",
      readable: "Black Concrete Powder",
    },
  ],
};

function getColorVariantGroup(itemId) {
  for (const [groupName, variants] of Object.entries(COLOR_VARIANTS)) {
    if (variants.find((v) => v.id === itemId)) {
      return { groupName, variants };
    }
  }
  return null;
}

export function getCraftableItems() {
  const allItems = [];

  // Get all items from items.json and add their array index as ID
  itemsData.items.forEach((item, index) => {
    if (item && (item.readable || item.name)) {
      // Filter out invalid items
      allItems.push({
        ...item,
        id: item.id !== undefined ? item.id : index,
        hasCraft: recipes[index] && recipes[index].length > 0,
      });
    }
  });

  return allItems.sort((a, b) => {
    const aName = a.readable || a.name || "";
    const bName = b.readable || b.name || "";
    return aName.localeCompare(bName);
  });
}

export function getItemById(id) {
  return itemsData.items.find((item, index) => {
    const itemId = item.id !== undefined ? item.id : index;
    return itemId === parseInt(id);
  });
}

export function getRecipesByItemId(itemId) {
  const itemRecipes = recipes[itemId] || [];

  // Sort recipes to prioritize shaped recipes (original crafting) over shapeless (re-coloring)
  return itemRecipes.sort((a, b) => {
    // Shaped recipes first
    if (a.inShape && !b.inShape) return -1;
    if (!a.inShape && b.inShape) return 1;
    return 0;
  });
}

export function findMatchingRecipe(inventory, size) {
  const inventoryIds = inventory.map((item) => (item ? item.id : null));

  for (const recipeList of Object.values(recipes)) {
    for (const recipe of recipeList) {
      if (
        recipe.ingredients &&
        matchIngredients(recipe.ingredients, inventoryIds)
      ) {
        return recipe;
      }
      if (recipe.inShape && matchInShape(recipe.inShape, inventoryIds, size)) {
        return recipe;
      }
    }
  }
  return null;
}

// Standard recipe patterns for color variants
const VARIANT_RECIPE_PATTERNS = {
  wool: {
    type: "dyeing",
    baseItem: 180, // White wool
    pattern: null, // Wool doesn't need crafting, it's dyed
  },
  bed: {
    type: "shaped",
    pattern: [
      [null, null, null], // Will be filled with wool IDs
      [null, null, null], // Will be filled with plank IDs
    ],
    woolSlots: [0, 1, 2], // Top row gets wool
    plankSlots: [3, 4, 5], // Bottom row gets planks
    plankId: 23, // Oak planks ID
  },
  carpet: {
    type: "shaped",
    pattern: [
      [null, null, null], // Will be filled with wool IDs
    ],
    woolSlots: [0, 1], // First two slots get wool
    otherSlots: [2], // Last slot stays empty
  },
  terracotta: {
    type: "shaped",
    pattern: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    centerSlots: [4], // Center gets dye
    surroundSlots: [0, 1, 2, 3, 5, 6, 7, 8], // Surround gets terracotta
    baseItem: 440, // Regular terracotta ID
  },
  concrete_powder: {
    type: "shaped",
    pattern: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    // Concrete powder = 4 sand + 4 gravel + 1 dye
    dyeSlots: [4], // Center gets dye
    sandSlots: [0, 2, 6, 8], // Corners get sand
    gravelSlots: [1, 3, 5, 7], // Sides get gravel
    sandId: 44, // Sand ID
    gravelId: 48, // Gravel ID
  },
};

// Mapping of wool colors to dye IDs
const WOOL_TO_DYE_MAP = {
  180: 904, // White wool -> White dye
  181: 905, // Orange wool -> Orange dye
  182: 906, // Magenta wool -> Magenta dye
  183: 907, // Light Blue wool -> Light Blue dye
  184: 908, // Yellow wool -> Yellow dye
  185: 909, // Lime wool -> Lime dye
  186: 910, // Pink wool -> Pink dye
  187: 911, // Gray wool -> Gray dye
  188: 912, // Light Gray wool -> Light Gray dye
  189: 913, // Cyan wool -> Cyan dye
  190: 914, // Purple wool -> Purple dye
  191: 915, // Blue wool -> Blue dye
  192: 916, // Brown wool -> Brown dye
  193: 917, // Green wool -> Green dye
  194: 918, // Red wool -> Red dye
  195: 919, // Black wool -> Black dye
};

// Special crafting requirements detection
export function getSpecialCraftingInfo(itemId, itemName) {
  const name = itemName?.toLowerCase() || "";

  // Furnace items (smelting)
  if (
    name.includes("ingot") ||
    name.includes("cooked") ||
    name.includes("baked") ||
    name.includes("glass") ||
    name.includes("smooth") ||
    name.includes("dried") ||
    itemId === 1 || // Stone (smelt cobblestone)
    itemId === 263 || // Brick (smelt clay ball)
    itemId === 403 // Terracotta (smelt clay)
  ) {
    return {
      type: "furnace",
      message: "Fabricado na FORNALHA",
      description: "Este item precisa ser fundido/cozido",
    };
  }

  // Smithing Table items (Netherite)
  if (name.includes("netherite")) {
    return {
      type: "smithing",
      message: "Fabricado na MESA DE FERRARIA",
      description: "Combine item de diamante + Netherite Ingot",
    };
  }

  // Brewing Stand items
  if (
    name.includes("potion") ||
    name.includes("splash") ||
    name.includes("lingering")
  ) {
    return {
      type: "brewing",
      message: "🧪 Fabricado no SUPORTE DE POÇÕES",
      description: "Use garrafas de água + ingredientes",
    };
  }

  // Enchanting Table
  if (name.includes("enchanted") && !name.includes("golden_apple")) {
    return {
      type: "enchanting",
      message: "✨ Fabricado na MESA DE ENCANTAMENTO",
      description: "Use XP e Lapis Lazuli para encantar",
    };
  }

  // Anvil combinations
  if (name.includes("chipped") || name.includes("damaged")) {
    return {
      type: "anvil",
      message: "🔨 Fabricado na BIGORNA",
      description: "Combine itens para reparar/renomear",
    };
  }

  // Loom (Banners)
  if (name.includes("banner")) {
    return {
      type: "loom",
      message: "🧵 Fabricado no TEAR",
      description: "Use padrões e corantes",
    };
  }

  // Stonecutter
  if (
    name.includes("slab") ||
    name.includes("stairs") ||
    name.includes("wall")
  ) {
    return {
      type: "stonecutter",
      message: "🪨 Pode ser fabricado no CORTADOR DE PEDRA",
      description: "Alternativa mais eficiente para alguns blocos",
    };
  }

  return null;
}

export function generateColorVariantRecipe(groupName, colorVariant) {
  const pattern = VARIANT_RECIPE_PATTERNS[groupName];
  if (!pattern) return null;

  const recipe = {
    result: {
      count: 1,
      id: colorVariant.id,
    },
  };

  if (pattern.type === "shaped") {
    const shape = pattern.pattern.map((row) => [...row]); // Deep copy

    if (groupName === "bed") {
      // Fill wool slots with current wool color
      const woolId = colorVariant.id - 744; // Convert bed ID to wool ID (approximate)
      const actualWoolId = 180 + (colorVariant.id - 924); // More accurate mapping

      pattern.woolSlots?.forEach((slot) => {
        const row = Math.floor(slot / 3);
        const col = slot % 3;
        shape[row][col] = actualWoolId;
      });

      // Fill plank slots
      pattern.plankSlots?.forEach((slot) => {
        const row = Math.floor(slot / 3);
        const col = slot % 3;
        shape[row][col] = pattern.plankId;
      });
    }

    if (groupName === "carpet") {
      // Fill with 2 wool of same color
      const actualWoolId = 180 + (colorVariant.id - 424);
      shape[0][0] = actualWoolId;
      shape[0][1] = actualWoolId;
      // Third slot stays null (empty)
    }

    if (groupName === "terracotta") {
      // Center gets dye, surround gets regular terracotta
      const woolId = 180 + (colorVariant.id - 405); // Convert terracotta ID to wool ID
      const dyeId = WOOL_TO_DYE_MAP[woolId] || 904; // Default to white dye

      pattern.centerSlots?.forEach((slot) => {
        const row = Math.floor(slot / 3);
        const col = slot % 3;
        shape[row][col] = dyeId;
      });

      pattern.surroundSlots?.forEach((slot) => {
        const row = Math.floor(slot / 3);
        const col = slot % 3;
        shape[row][col] = pattern.baseItem;
      });
    }

    if (groupName === "concrete_powder") {
      const woolId = 180 + (colorVariant.id - 549); // Convert concrete powder ID to wool ID
      const dyeId = WOOL_TO_DYE_MAP[woolId] || 904; // Default to white dye

      pattern.dyeSlots?.forEach((slot) => {
        const row = Math.floor(slot / 3);
        const col = slot % 3;
        shape[row][col] = dyeId;
      });

      pattern.sandSlots?.forEach((slot) => {
        const row = Math.floor(slot / 3);
        const col = slot % 3;
        shape[row][col] = pattern.sandId;
      });

      pattern.gravelSlots?.forEach((slot) => {
        const row = Math.floor(slot / 3);
        const col = slot % 3;
        shape[row][col] = pattern.gravelId;
      });
    }

    recipe.inShape = shape;
  }

  return recipe;
}

export function getRecipeForColorVariant(baseItem, colorVariantId) {
  if (!baseItem.isColorVariant) return null;

  const targetVariant = baseItem.colorVariants.find(
    (v) => v.id === colorVariantId
  );
  if (!targetVariant) return null;

  // Try to get existing recipe first
  const existingRecipe = recipes[colorVariantId];
  if (existingRecipe && existingRecipe[0]) {
    return existingRecipe[0];
  }

  // Generate synthetic recipe based on pattern
  return generateColorVariantRecipe(baseItem.groupName, targetVariant);
}

function matchIngredients(ingredients, inventoryIds) {
  const inventoryCounts = inventoryIds.reduce((counts, id) => {
    if (id !== null) {
      counts[id] = (counts[id] || 0) + 1;
    }
    return counts;
  }, {});

  const recipeCounts = ingredients.reduce((counts, id) => {
    counts[id] = (counts[id] || 0) + 1;
    return counts;
  }, {});

  return (
    Object.keys(recipeCounts).length === Object.keys(inventoryCounts).length &&
    Object.entries(recipeCounts).every(
      ([id, count]) => inventoryCounts[id] === count
    )
  );
}

function matchInShape(shape, inventoryIds, size) {
  const inventoryGrid = [];
  for (let i = 0; i < size; i++) {
    inventoryGrid.push(inventoryIds.slice(i * size, (i + 1) * size));
  }

  const shapeHeight = shape.length;
  const shapeWidth = Math.max(...shape.map((row) => row.length));

  for (let i = 0; i <= size - shapeHeight; i++) {
    for (let j = 0; j <= size - shapeWidth; j++) {
      if (checkShapeMatch(shape, inventoryGrid, i, j, size)) {
        return true;
      }
    }
  }
  return false;
}

export function normalizeRecipeShape(recipe) {
  if (!recipe) return recipe;

  const maxSize = 3;
  let normalizedShape = [];

  if (recipe.inShape) {
    // Handle shaped recipes
    const shape = recipe.inShape;

    // Pad the shape to fit a 3x3 grid
    for (let i = 0; i < maxSize; i++) {
      const row = [];
      for (let j = 0; j < maxSize; j++) {
        if (i < shape.length && j < shape[i].length) {
          row.push(shape[i][j]);
        } else {
          row.push(null);
        }
      }
      normalizedShape.push(row);
    }
  } else if (recipe.ingredients) {
    // Handle shapeless recipes - arrange ingredients in the grid
    normalizedShape = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));

    // Place ingredients starting from top-left
    let ingredientIndex = 0;
    for (let i = 0; i < 3 && ingredientIndex < recipe.ingredients.length; i++) {
      for (
        let j = 0;
        j < 3 && ingredientIndex < recipe.ingredients.length;
        j++
      ) {
        normalizedShape[i][j] = recipe.ingredients[ingredientIndex];
        ingredientIndex++;
      }
    }
  } else {
    // Fallback: empty 3x3 grid
    normalizedShape = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));
  }

  return {
    ...recipe,
    inShape: normalizedShape,
  };
}

function checkShapeMatch(shape, grid, startRow, startCol, size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const shapeRow = i - startRow;
      const shapeCol = j - startCol;

      if (
        shapeRow >= 0 &&
        shapeRow < shape.length &&
        shapeCol >= 0 &&
        shapeCol < shape[shapeRow].length
      ) {
        const shapeItem = shape[shapeRow][shapeCol];
        const gridItem = grid[i][j];

        if (shapeItem === null && gridItem !== null) return false;
        if (shapeItem !== null && shapeItem !== 0 && shapeItem !== gridItem)
          return false;
      } else if (grid[i][j] !== null) {
        return false;
      }
    }
  }
  return true;
}
