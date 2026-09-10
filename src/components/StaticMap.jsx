import G from "../constants/colors";
import Icon from "./Icon";

const StaticMap = () => {
  return (
    <div
      style={{
        width: "100%",
        height: 300,
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${G.border}`,
        background: "#e8f4f8",
        position: "relative",
      }}
    >
      <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="300" fill="#e8f4f8" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="300" stroke="#d0e8f0" strokeWidth="1" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="800" y2={i * 100} stroke="#d0e8f0" strokeWidth="1" />
        ))}
        <line x1="0" y1="150" x2="800" y2="150" stroke="#c8dce0" strokeWidth="8" />
        <line x1="400" y1="0" x2="400" y2="300" stroke="#c8dce0" strokeWidth="6" />
        <line x1="0" y1="80" x2="800" y2="200" stroke="#d4e4e8" strokeWidth="4" />
        <line x1="200" y1="0" x2="600" y2="300" stroke="#d4e4e8" strokeWidth="3" />
        {[
          [120, 60, 80, 60], [250, 40, 60, 50], [320, 90, 90, 40],
          [480, 55, 70, 55], [560, 100, 80, 40], [100, 180, 70, 50],
          [200, 160, 90, 60], [350, 190, 100, 50], [530, 170, 80, 50], [650, 140, 70, 60],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#c8d8dc" opacity="0.6" />
        ))}
        <circle cx="400" cy="150" r="60" fill={G.crimson} opacity="0.08" />
        <circle cx="400" cy="150" r="35" fill={G.crimson} opacity="0.12" />
        <path
          d="M400 100 C385 100 373 112 373 127 C373 148 400 175 400 175 C400 175 427 148 427 127 C427 112 415 100 400 100Z"
          fill={G.crimson}
        />
        <circle cx="400" cy="127" r="11" fill="white" />
        <circle cx="400" cy="127" r="6" fill={G.crimson} />
        <rect x="310" y="55" width="180" height="34" rx="8" fill="white" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.15))" />
        <text x="400" y="77" textAnchor="middle" fontFamily="'Manrope',sans-serif" fontWeight="700" fontSize="13" fill={G.crimson}>XOAS — West Bengal</text>
        <rect x="292" y="184" width="216" height="24" rx="6" fill="white" opacity="0.9" />
        <text x="400" y="200" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fill={G.textSecondary}>23°13'34.5"N &nbsp; 88°21'29.8"E</text>
      </svg>
      <a
        href="https://maps.google.com/?q=23.2263,88.3580"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          background: G.crimson,
          color: "white",
          padding: "8px 16px",
          borderRadius: 8,
          textDecoration: "none",
          fontSize: 13,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 6,
          boxShadow: "0 4px 12px rgba(178,30,53,0.4)",
        }}
      >
        <Icon name="map" size={14} color="white" /> Open in Google Maps
      </a>
    </div>
  );
};

export default StaticMap;
