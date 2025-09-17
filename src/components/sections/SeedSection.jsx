import fundoTerra from "../../assets/new-image.png";
import anelSeed from "../../assets/anel-seed(1).webp";
import lagoSeed from "../../assets/lago-seed.webp";
import lavaSeed from "../../assets/lava-seed (1).webp";
import cranioSeed from "../../assets/cranio-seed (1).webp";
import aldeiaSeed from "../../assets/aldeia-seed (1).webp";
import neveSeed from "../../assets/neve-seed (1).webp";
import { Title, Button, HelpCard } from "../ui";
import { useState, useCallback } from "react";
import MinecraftBackground from "../ui/MinecraftBackground";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SeedCard = ({ image, title, coords, seed, onCopy, isCopied }) => {
  return (
    <div className="bg-[#262523] border-2 border-[#747474] shadow-lg overflow-hidden rounded-sm transition-transform hover:scale-105 duration-200">
      <img
        src={image}
        alt=""
        className="w-full h-48 xs:h-52 sm:h-40 md:h-44 lg:h-48 object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="p-3 xs:p-4 text-white font-minecraft text-[10px] xs:text-[11px] sm:text-[11px] md:text-xs leading-tight">
        <div className="uppercase mb-2 break-words">{title}</div>
        <div className="opacity-80 break-words">
          COORDENADAS IMPORTANTES: {coords}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 xs:gap-2 bg-[#585858] px-3 xs:px-3 py-3">
        <span className="text-white font-minecraft text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs leading-[1.35] break-all">
          {seed}
        </span>
        <Button
          className="py-1 xs:py-1.5 px-6 xs:px-3 text-[8px] xs:text-[10px] sm:text-xs whitespace-nowrap"
          onClick={() => onCopy(seed)}
        >
          {isCopied ? "COPIADO" : "COPIAR"}
        </Button>
      </div>
    </div>
  );
};

const SeedSection = () => {
  const swiperStyles = `
    .swiper-green .swiper-pagination-bullet {
      background-color: #4ade80;
      opacity: 0.5;
    }
    .swiper-green .swiper-pagination-bullet-active {
      background-color: #22c55e;
      opacity: 1;
    }
    .swiper-green .swiper-button-next,
    .swiper-green .swiper-button-prev {
      color: #22c55e;
    }
    .swiper-green .swiper-button-next:after,
    .swiper-green .swiper-button-prev:after {
      font-weight: bold;
    }
  `;
  const [copiedSeed, setCopiedSeed] = useState("");
  const seeds = [
    {
      image: anelSeed,
      title: "SEMENTE DE ANEL DE RIO",
      coords: "-300, -20",
      seed: "1691256543523180978",
    },
    {
      image: lagoSeed,
      title: "SEMENTE DO LAGO TEMPLE",
      coords: "42, 60",
      seed: "-2332803749585407299",
    },
    {
      image: lavaSeed,
      title: "TEMPLO SUBTERRÂNEO DE LAVA",
      coords: "21, -46, 16",
      seed: "2482490754905255652",
    },
    {
      image: cranioSeed,
      title: "ILHA DA CAVERNA",
      coords: "-160, -144",
      seed: "1040934860",
    },
    {
      image: aldeiaSeed,
      title: "MONOLITO DA ALDEIA",
      coords: "-416, 128",
      seed: "-6537256334104833826",
    },
    {
      image: neveSeed,
      title: "LINDA SEMENTE NEVADA",
      coords: "93, 2.655",
      seed: "7050622155736149866",
    },
  ];
  const handleCopy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSeed(text);
      setTimeout(() => setCopiedSeed(""), 1500);
    } catch (_) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedSeed(text);
      setTimeout(() => setCopiedSeed(""), 1500);
    }
  }, []);
  return (
    <section
      id="seeds"
      className="relative min-h-screen flex items-center justify-center py-4 sm:py-8 md:py-16 px-1 sm:px-2 md:px-4 overflow-visible"
      style={{ contentVisibility: "auto" }}
    >
      <style>{swiperStyles}</style>
      <MinecraftBackground />
      <div />
      <div className="relative z-10 w-full max-w-7xl mt-16 xs:mt-20 sm:mt-24 md:mt-28">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <Title className="text-white font-minecraft text-3xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-2">
            ESCOLHA UMA SEED PARA JOGAR!
          </Title>
        </div>
        {/* Swiper para mobile/tablet */}
        <div className="block lg:hidden">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation
            breakpoints={{
              480: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
            }}
            className="w-full swiper-green"
          >
            {seeds.map((item) => (
              <SwiperSlide key={item.seed}>
                <SeedCard
                  image={item.image}
                  title={item.title}
                  coords={item.coords}
                  seed={item.seed}
                  isCopied={copiedSeed === item.seed}
                  onCopy={handleCopy}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid para desktop */}
        <div className="hidden lg:grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
          {seeds.map((item) => (
            <SeedCard
              key={item.seed}
              image={item.image}
              title={item.title}
              coords={item.coords}
              seed={item.seed}
              isCopied={copiedSeed === item.seed}
              onCopy={handleCopy}
            />
          ))}
        </div>
      </div>
      <HelpCard
        title="O QUE É UMA SEED?"
        content="Seeds são códigos únicos que geram mundos específicos no Minecraft. Cada seed cria um mundo com terrenos, estruturas e biomas únicos. Usando a mesma seed, você pode gerar o mesmo mundo quantas vezes quiser! As coordenadas mostram onde encontrar pontos interessantes como aldeias, templos ou estruturas raras."
        position="fixed top-24 right-2 sm:top-44 sm:right-4"
      />
    </section>
  );
};

export default SeedSection;
