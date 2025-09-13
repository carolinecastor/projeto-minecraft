import { useState } from "react";
import { getCraftableItems, getRecipesByItemId, getItemById } from "../../utils/craftHelper";
import RecipeDisplay from "./RecipeDisplay";

const CraftGuide = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const craftableItems = getCraftableItems();
  
  const filteredItems = craftableItems.filter(item =>
    item.readable?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item, index) => {
    const itemWithId = { ...item, id: item.id !== undefined ? item.id : index };
    setSelectedItem(itemWithId);
    setSelectedRecipeIndex(0);
  };

  const recipes = selectedItem ? getRecipesByItemId(selectedItem.id?.toString()) : [];
  const currentRecipe = recipes[selectedRecipeIndex];

  return (
    <div className="craft-guide" style={{ 
      padding: '20px', 
      backgroundColor: '#0d1421',
      minHeight: '100vh',
      color: '#fff',
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.1) 0%, transparent 50%)
      `
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '40px', 
        fontSize: '3rem',
        background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 30px rgba(76, 175, 80, 0.5)',
        fontWeight: 'bold'
      }}>
        📖 Guia de Craft do Minecraft
      </h1>

      <div style={{ 
        display: 'flex', 
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Items List */}
        <div style={{ 
          flex: '0 0 420px',
          backgroundColor: 'rgba(42, 42, 42, 0.9)',
          padding: '25px',
          borderRadius: '15px',
          height: 'fit-content',
          border: '2px solid rgba(76, 175, 80, 0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ 
            marginBottom: '25px', 
            textAlign: 'center',
            color: '#4CAF50',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            🔨 Items Craftáveis
          </h2>
          
          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Buscar item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              marginBottom: '25px',
              backgroundColor: 'rgba(51, 51, 51, 0.8)',
              border: '2px solid rgba(76, 175, 80, 0.3)',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(76, 175, 80, 0.3)'}
          />

          <div style={{ 
            maxHeight: '600px', 
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '10px'
          }}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id !== undefined ? item.id : index}
                onClick={() => handleItemClick(item, index)}
                style={{
                  padding: '10px',
                  backgroundColor: selectedItem?.id === item.id ? '#4a4a4a' : '#333',
                  border: '2px solid',
                  borderColor: selectedItem?.id === item.id ? '#666' : '#555',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px'
                }}
                onMouseEnter={(e) => {
                  if (selectedItem?.id !== item.id) {
                    e.target.style.backgroundColor = '#444';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedItem?.id !== item.id) {
                    e.target.style.backgroundColor = '#333';
                  }
                }}
              >
                {item.texture && (
                  <img
                    src={item.texture}
                    alt={item.readable}
                    style={{ 
                      width: '32px', 
                      height: '32px',
                      imageRendering: 'pixelated'
                    }}
                  />
                )}
                <span style={{ 
                  fontSize: '12px',
                  wordWrap: 'break-word',
                  lineHeight: '1.2'
                }}>
                  {item.readable}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recipe Display */}
        <div style={{ flex: '1' }}>
          {selectedItem ? (
            <div>
              {/* Multiple recipes navigation */}
              {recipes.length > 1 && (
                <div style={{ 
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px'
                }}>
                  {recipes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedRecipeIndex(index)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: selectedRecipeIndex === index ? '#4a4a4a' : '#333',
                        border: '1px solid #555',
                        borderRadius: '5px',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Receita {index + 1}
                    </button>
                  ))}
                </div>
              )}

              <RecipeDisplay 
                recipe={currentRecipe} 
                resultItem={selectedItem}
              />
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '100px 20px',
              backgroundColor: '#2a2a2a',
              borderRadius: '10px'
            }}>
              <h2 style={{ marginBottom: '20px', opacity: 0.7 }}>
                Selecione um item para ver sua receita
              </h2>
              <p style={{ opacity: 0.5 }}>
                Clique em qualquer item da lista para visualizar como craftá-lo
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CraftGuide;