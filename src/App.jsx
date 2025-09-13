import { useState, useCallback, useMemo } from "react";
import {
  Header,
  HeroSection,
  CharacterSelection,
  GuideSection,
  SeedSection,
  CraftSection,
  Footer,
} from "./components/sections";
import { Transition, PedraTransition } from "./components/ui";

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
      <PedraTransition />
      <Footer />
    </div>
  );
}

export default App;
