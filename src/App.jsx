import { useState, useCallback, useMemo } from "react";
import {
  Header,
  HeroSection,
  CharacterSelection,
  GuideSection,
  SeedSection,
  CraftSection,
} from "./components/sections";
import { Transition } from "./components/ui";

function App() {
  const [selectedCursor, setSelectedCursor] = useState(null);

  const handleCursorChange = useCallback((cursor) => {
    setSelectedCursor(cursor);
  }, []);

  const cursorStyle = useMemo(
    () => ({
      cursor: selectedCursor ? `url(${selectedCursor}) 16 16, auto` : "default",
    }),
    [selectedCursor]
  );

  return (
    <div style={cursorStyle}>
      <Header />
      <HeroSection />
      <CharacterSelection onCursorChange={handleCursorChange} />
      <Transition className="-top-28" />
      <GuideSection />
      <SeedSection />
      <CraftSection />
    </div>
  );
}

export default App;
