import { useState } from "react";

const HelpCard = ({ title, content, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`fixed top-40 right-6 z-20 ${className}`}>
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
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
          <div className="absolute top-14 right-0 w-80 bg-[#262523] border-2 border-[#747474] shadow-xl p-4 text-white font-minecraft">
            <h3 className="text-sm font-bold mb-2 text-white">{title}</h3>
            <p className="text-xs leading-relaxed">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCard;
