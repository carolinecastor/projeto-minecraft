import { useState, useEffect, useRef } from "react";
import { playClickSound } from "../../utils/soundUtils";

const HelpCard = ({ title, content, className = "", position = "fixed top-40 right-6" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const helpCardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpCardRef.current && !helpCardRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className={`${position} z-20 ${className}`} ref={helpCardRef}>
      <div className="relative">
        <button
          onClick={() => {
            playClickSound();
            setIsExpanded(!isExpanded);
          }}
          className="w-12 h-12 bg-[#585858] border-2 border-[#747474] shadow-lg hover:bg-[#3D3938] transition-colors duration-150 font-minecraft text-white flex items-center justify-center"
          style={{
            fontSize: "20px",
            lineHeight: "1",
            fontWeight: "normal",
            paddingTop: "12px",
          }}
        >
          ?
        </button>

        {isExpanded && (
          <div className="absolute -top-32 sm:top-14 right-0 w-80 bg-[#262523] border-2 border-[#747474] shadow-xl p-4 text-white font-minecraft">
            <h3 className="text-sm font-bold mb-2 text-white">{title}</h3>
            <p className="text-xs leading-relaxed">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCard;
