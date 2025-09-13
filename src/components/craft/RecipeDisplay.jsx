import { getItemById } from "../../utils/craftHelper";

const RecipeDisplay = ({ recipe, resultItem }) => {
  if (!recipe) return null;

  const renderGrid = (grid) => {
    // Always use 3x3 grid for crafting table recipes
    const gridSize = 3;

    return (
      <div className="recipe-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${gridSize}, 48px)`, 
        gap: '2px',
        background: '#373737',
        padding: '8px',
        border: '2px solid',
        borderColor: '#1C1C1C #8B8680 #8B8680 #1C1C1C',
        imageRendering: 'pixelated'
      }}>
        {Array.from({ length: gridSize * gridSize }, (_, index) => {
          const rowIndex = Math.floor(index / gridSize);
          const colIndex = index % gridSize;
          const itemId = grid[rowIndex]?.[colIndex];
          const item = itemId && itemId !== null ? getItemById(itemId) : null;
          
          return (
            <div key={index} className="recipe-slot" style={{
              width: '48px',
              height: '48px',
              border: '1px solid',
              borderColor: itemId === null 
                ? '#1C1C1C #8B8680 #8B8680 #1C1C1C'
                : '#363631 #C0C0C0 #C0C0C0 #363631',
              background: itemId === null 
                ? '#2A2A2A' 
                : '#8B8680',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              imageRendering: 'pixelated',
              position: 'relative'
            }}>
              {item?.texture && (
                <img 
                  src={item.texture} 
                  alt={item.readable}
                  title={item.readable}
                  style={{ width: '32px', height: '32px', imageRendering: 'pixelated' }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderIngredientsList = (ingredients) => {
    const ingredientCounts = ingredients.reduce((counts, id) => {
      counts[id] = (counts[id] || 0) + 1;
      return counts;
    }, {});

    return (
      <div className="recipe-ingredients" style={{ 
        display: 'flex', 
        gap: '12px', 
        flexWrap: 'wrap',
        background: '#373737',
        padding: '12px',
        border: '2px solid',
        borderColor: '#1C1C1C #8B8680 #8B8680 #1C1C1C',
        justifyContent: 'center',
        imageRendering: 'pixelated'
      }}>
        {Object.entries(ingredientCounts).map(([itemId, count]) => {
          const item = getItemById(parseInt(itemId));
          return (
            <div key={itemId} className="ingredient-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                border: '1px solid',
                borderColor: '#363631 #C0C0C0 #C0C0C0 #363631',
                background: '#8B8680',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {item?.texture && (
                  <img 
                    src={item.texture} 
                    alt={item.readable}
                    title={item.readable}
                    style={{ width: '40px', height: '40px', imageRendering: 'pixelated' }}
                  />
                )}
                {count > 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-6px',
                    right: '-6px',
                    background: '#666666',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 6px',
                    borderRadius: '10px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    minWidth: '20px',
                    textAlign: 'center'
                  }}>
                    {count}
                  </div>
                )}
              </div>
              <span style={{ 
                fontSize: '12px',
                fontWeight: '600', 
                color: '#E0E0E0', 
                textAlign: 'center',
                maxWidth: '80px',
                wordWrap: 'break-word',
                opacity: '0.9'
              }}>
                {item?.readable}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="recipe-display">
      <div style={{ 
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h3 style={{ 
          fontSize: '1.8rem',
          fontWeight: '700',
          color: '#FFFFFF',
          marginBottom: '8px'
        }}>
          {resultItem?.readable}
        </h3>
        <p style={{
          color: '#B0B0B0',
          fontSize: '1rem',
          opacity: '0.8'
        }}>
          Como craftar este item
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '30px',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          gap: '20px'
        }
      }}>
        {/* Ingredients/Pattern */}
        <div style={{
          background: '#373737',
          padding: '16px',
          border: '2px solid',
          borderColor: '#1C1C1C #8B8680 #8B8680 #1C1C1C',
          textAlign: 'center'
        }}>
          <h4 style={{
            color: '#E0E0E0',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '16px',
            opacity: '0.8',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {recipe.inShape ? 'Mesa de Craft' : 'Ingredientes'}
          </h4>
          {recipe.inShape ? renderGrid(recipe.inShape) : renderIngredientsList(recipe.ingredients)}
        </div>

        {/* Arrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50px',
          height: '50px',
          background: '#8B8680',
          border: '2px solid',
          borderColor: '#FFFFFF #363631 #363631 #FFFFFF',
          boxShadow: 'inset 1px 1px 0px rgba(255, 255, 255, 0.5), inset -1px -1px 0px rgba(0, 0, 0, 0.5)'
        }}>
          <span style={{
            fontSize: '24px',
            color: '#FFFFFF',
            fontWeight: 'bold'
          }}>
            →
          </span>
        </div>

        {/* Result */}
        <div style={{
          background: '#373737',
          padding: '16px',
          border: '2px solid',
          borderColor: '#1C1C1C #8B8680 #8B8680 #1C1C1C',
          textAlign: 'center'
        }}>
          <h4 style={{
            color: '#E0E0E0',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '16px',
            opacity: '0.8',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Resultado
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#8B8680',
              border: '2px solid',
              borderColor: '#FFFFFF #363631 #363631 #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: 'inset 1px 1px 0px rgba(255, 255, 255, 0.5), inset -1px -1px 0px rgba(0, 0, 0, 0.5)'
            }}>
              {resultItem?.texture && (
                <img 
                  src={resultItem.texture} 
                  alt={resultItem.readable}
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    imageRendering: 'pixelated'
                  }}
                />
              )}
              {recipe.result.count > 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '-8px',
                  background: 'linear-gradient(135deg, #D2691E, #8B4513)',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  border: '1px solid',
                  borderColor: '#FFFFFF #1C1C1C #1C1C1C #FFFFFF'
                }}>
                  {recipe.result.count}
                </div>
              )}
            </div>
            <span style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#FFFFFF',
              opacity: '0.9'
            }}>
              {resultItem?.readable}
              {recipe.result.count > 1 && (
                <span style={{ 
                  color: '#FFFFFF',
                  marginLeft: '8px'
                }}>
                  ×{recipe.result.count}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;