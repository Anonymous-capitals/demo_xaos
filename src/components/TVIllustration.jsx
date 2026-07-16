const TVIllustration = ({ label, size = 180 }) => {
  const colors = {
    '32" HD LED': ["#1C1C1E", "#A5001A"],
    '43" FHD Smart': ["#1C1C1E", "#C9A84C"],
    '55" 4K QLED': ["#0F0F13", "#A5001A"],
    '65" OLED': ["#000000", "#A5001A"],
    Remote: ["#2D2D2D", "#A5001A"],
  };
  const [bg, acc] = colors[label] || ["#1C1C1E", "#A5001A"];

  if (label === "Remote")
    return (
      <svg width={size * 0.5} height={size} viewBox="0 0 80 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="5" width="60" height="150" rx="18" fill={bg} />
        <rect x="20" y="20" width="40" height="28" rx="6" fill={acc} opacity="0.8" />
        <circle cx="40" cy="34" r="8" fill="white" opacity="0.9" />
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect key={`${row}-${col}`} x={22 + col * 17} y={62 + row * 22} width="13" height="13" rx="3" fill="white" opacity="0.15" />
          ))
        )}
      </svg>
    );

  return (
    <svg width={size} height={size * 0.65} viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="272" height="152" rx="12" fill={bg} stroke="#333" strokeWidth="6" />
      <defs>
        <linearGradient id={`g${label.replace(/\W/g, "")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={acc} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#003080" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="260" height="140" rx="8" fill={`url(#g${label.replace(/\W/g, "")})`} />
      <text x="140" y="72" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="36" fontWeight="700" fill="white" letterSpacing="4" opacity="0.95">XOAS</text>
      <text x="140" y="96" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fill="white" opacity="0.5" letterSpacing="3">{label.toUpperCase()}</text>
      <rect x="4" y="156" width="272" height="10" rx="0" fill="#111" />
      <rect x="116" y="166" width="48" height="8" rx="0" fill="#222" />
      <rect x="80" y="174" width="120" height="5" rx="2" fill="#1a1a1a" />
    </svg>
  );
};

export default TVIllustration;
