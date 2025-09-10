import { useState } from "react";
import { Header, HeroSection, CharacterSelection, GuideSection } from "./components/sections";

function App() {
  const [selectedCursor, setSelectedCursor] = useState(null);

  const handleCursorChange = (cursor) => {
    setSelectedCursor(cursor);
  };

  return (
    <div
      style={{
        cursor: selectedCursor
          ? `url(${selectedCursor}) 16 16, auto`
          : "default",
      }}
    >
      <Header />
      <HeroSection />
      <CharacterSelection onCursorChange={handleCursorChange} />
      <GuideSection />
    </div>
  );
}

export default App;
