import { useEffect, useState } from "react";

const HERO_IMAGES = [
  { src: "/hero/hero-1.png", alt: "XOAS flagship television in a premium living room" },
  { src: "/hero/hero-2.png", alt: "XOAS home cinema audio setup" },
  { src: "/hero/hero-3.png", alt: "XOAS immersive entertainment space" },
];

const HeroShowcase = ({ onNavigate = () => {} }) => {
  const [index, setIndex] = useState(0);

  // ponytail: fixed 5s crossfade; add blur-up/scroll-sync only if it ever measurably matters
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % HERO_IMAGES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{ position: "absolute", inset: 0, cursor: "pointer" }}
      onClick={() => onNavigate(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNavigate(index);
        }
      }}
    >
      {HERO_IMAGES.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === index ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            aria-label={`Show slide ${i + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: i === index ? "#B21E35" : "rgba(255,255,255,0.5)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroShowcase;