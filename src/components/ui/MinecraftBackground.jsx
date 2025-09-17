import fundoTerra from "../../assets/new-image.png";

const MinecraftBackground = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: "#8B7355",
        backgroundImage: `url(${fundoTerra})`,

        backgroundSize: "cover",
        imageRendering: "pixelated",
      }}
    />
  );
};

export default MinecraftBackground;
