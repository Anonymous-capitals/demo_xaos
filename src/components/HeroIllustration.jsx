const HeroIllustration = () => (
  <svg viewBox="0 0 800 520" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '100%', maxWidth: 680, height: 'auto', display: 'block'}}>
    <defs>
      <filter id="gSoft" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="20" result="b" />
      </filter>
      <filter id="gGlow10" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
      <filter id="gGlow6" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="6" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
      <filter id="gShadow8" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="b" />
      </filter>

      <linearGradient id="scrGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C41E1E" stopOpacity="0.05" />
        <stop offset="45%" stopColor="#C41E1E" stopOpacity="0.015" />
        <stop offset="100%" stopColor="#C41E1E" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="scrReflect" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.035" />
        <stop offset="30%" stopColor="#C9A84C" stopOpacity="0.008" />
        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="standGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C41E1E" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#C41E1E" stopOpacity="0.06" />
      </linearGradient>
      <radialGradient id="ambientTV" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#C41E1E" stopOpacity="0.1" />
        <stop offset="50%" stopColor="#C41E1E" stopOpacity="0.035" />
        <stop offset="100%" stopColor="#C41E1E" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="shelfGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#C41E1E" stopOpacity="0.06" />
        <stop offset="60%" stopColor="#C9A84C" stopOpacity="0.015" />
        <stop offset="100%" stopColor="#C41E1E" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF8C42" stopOpacity="0.18" />
        <stop offset="40%" stopColor="#C9A84C" stopOpacity="0.07" />
        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="bgVignette" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#C41E1E" stopOpacity="0.025" />
        <stop offset="55%" stopColor="#C41E1E" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#0F0F13" stopOpacity="0.12" />
      </radialGradient>

      <style>{`
        @keyframes hBreathe { 0%,100% { opacity: 0.07; } 50% { opacity: 0.14; } }
        @keyframes hBreatheSoft { 0%,100% { opacity: 0.03; } 50% { opacity: 0.08; } }
        @keyframes hSlideReflect { 0% { transform: translateX(-120%); } 100% { transform: translateX(260%); } }
        @keyframes hWooferPulse { 0%,100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.02); opacity: 0.5; } }
        @keyframes hLampFlicker { 0%,100% { opacity: 0.12; } 30% { opacity: 0.09; } 60% { opacity: 0.15; } 80% { opacity: 0.08; } }
        @keyframes hBgShift { 0% { opacity: 0.15; } 50% { opacity: 0.28; } 100% { opacity: 0.15; } }
        @keyframes hTweeterGlow { 0%,100% { opacity: 0.12; } 50% { opacity: 0.25; } }
        @keyframes hFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes hDraw {
          from { stroke-dashoffset: var(--d); }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </defs>

    {/* ====== Background ====== */}
    <rect width="800" height="520" fill="#0F0F13" />
    <rect width="800" height="520" fill="url(#bgVignette)" style={{animation: 'hBgShift 8s ease infinite'}} />

    {/* ====== Ambient glow behind TV ====== */}
    <ellipse cx="400" cy="210" rx="260" ry="170" fill="url(#ambientTV)" filter="url(#gSoft)"
      style={{animation: 'hBreathe 5s ease infinite'}} />
    <ellipse cx="400" cy="210" rx="200" ry="130" fill="url(#ambientTV)" filter="url(#gSoft)"
      style={{animation: 'hBreatheSoft 6s ease infinite 1s'}} />

    {/* ====== Premium floating shelf ====== */}
    <g style={{animation: 'hFadeIn 1.2s ease forwards', opacity: 0}}>
      <ellipse cx="400" cy="432" rx="320" ry="6" fill="url(#shelfGlow)" filter="url(#gSoft)" />
      <line x1="80" y1="432" x2="720" y2="432" stroke="#C41E1E" strokeWidth="0.8" opacity="0.06" strokeLinecap="round" />
      <line x1="100" y1="434" x2="700" y2="434" stroke="#C9A84C" strokeWidth="0.4" opacity="0.025" strokeLinecap="round" />
    </g>

    {/* ====== Contact shadows on shelf ====== */}
    <g opacity="0.035" style={{animation: 'hFadeIn 1.5s ease 0.3s forwards', opacity: 0}} filter="url(#gShadow8)">
      <rect x="340" y="432" width="120" height="5" rx="2.5" fill="#C41E1E" />
      <rect x="60" y="432" width="72" height="5" rx="2.5" fill="#C41E1E" />
      <rect x="668" y="432" width="72" height="5" rx="2.5" fill="#C41E1E" />
    </g>

    {/* ====== Floor reflection (mirrored) ====== */}
    <g opacity="0.015" style={{animation: 'hFadeIn 2s ease 0.5s forwards', opacity: 0}}>
      <rect x="184" y="440" width="432" height="18" rx="9" fill="#C41E1E" filter="url(#gShadow8)" />
      <rect x="64" y="440" width="64" height="14" rx="7" fill="#C41E1E" filter="url(#gShadow8)" />
      <rect x="672" y="440" width="64" height="14" rx="7" fill="#C41E1E" filter="url(#gShadow8)" />
      <ellipse cx="48" cy="440" rx="14" ry="3" fill="#C9A84C" />
    </g>

    {/* ====== FLOOR LAMP (behind left speaker) ====== */}
    <g style={{animation: 'hFadeIn 1s ease 0.2s forwards', opacity: 0}}>
      {/* Warm glow illuminating left side */}
      <ellipse cx="40" cy="240" rx="80" ry="160" fill="url(#lampGlow)" filter="url(#gSoft)"
        style={{animation: 'hLampFlicker 4s ease infinite'}} />
      <ellipse cx="48" cy="200" rx="40" ry="50" fill="#C9A84C" opacity="0.03" filter="url(#gGlow10)"
        style={{animation: 'hLampFlicker 4s ease infinite 0.6s'}} />
      {/* Base */}
      <ellipse cx="48" cy="432" rx="11" ry="3.5" stroke="#C9A84C" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
      <ellipse cx="48" cy="431" rx="8" ry="2.5" fill="#C9A84C" opacity="0.025" />
      {/* Pole */}
      <rect x="45" y="144" width="6" height="287" rx="3" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      <rect x="46.5" y="144" width="3" height="287" fill="#C9A84C" opacity="0.025" />
      {/* Arm */}
      <path d="M48 144 Q48 118 64 108 L70 104" stroke="#C9A84C" strokeWidth="1.8" opacity="0.25" strokeLinecap="round" fill="none" />
      {/* Light head */}
      <path d="M64 96 L84 106 L78 118 L58 108 Z" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" strokeLinejoin="round" fill="none" />
      <path d="M64 96 L84 106 L78 118 L58 108 Z" fill="#C9A84C" opacity="0.02" />
      {/* Light cone */}
      <path d="M58 118 L36 175 Q48 180 60 175 L78 118" stroke="#C9A84C" strokeWidth="0.6" opacity="0.04" fill="none" strokeLinecap="round" />
      <path d="M56 118 L28 180 Q48 186 68 180 L80 118" stroke="#FF8C42" strokeWidth="0.4" opacity="0.02" fill="none" strokeLinecap="round" />
    </g>

    {/* ====== LEFT SPEAKER (Hi-Fi Tower) ====== */}
    <g style={{animation: 'hFadeIn 0.8s ease 0.15s forwards', opacity: 0}}>
      {/* Ambient glow */}
      <ellipse cx="96" cy="272" rx="48" ry="140" fill="url(#ambientTV)" filter="url(#gSoft)"
        style={{animation: 'hBreatheSoft 5s ease infinite'}} />
      {/* Body */}
      <rect x="60" y="112" width="72" height="320" rx="10" stroke="#C41E1E" strokeWidth="2.2" opacity="0.32"
        style={{'--d': '784', strokeDasharray: '784', strokeDashoffset: '784', animation: 'hDraw 0.8s ease 0.1s forwards'}} />
      <rect x="63" y="115" width="66" height="314" rx="8" stroke="#C41E1E" strokeWidth="0.5" opacity="0.06" />
      {/* Top cap */}
      <rect x="58" y="107" width="76" height="10" rx="4" stroke="#C41E1E" strokeWidth="1.5" opacity="0.18" />
      <rect x="61" y="109" width="70" height="6" rx="3" fill="#C41E1E" opacity="0.015" />
      {/* Bottom cap */}
      <rect x="58" y="424" width="76" height="8" rx="3" stroke="#C41E1E" strokeWidth="1.5" opacity="0.18" />
      <rect x="61" y="425" width="70" height="5" rx="2.5" fill="#C41E1E" opacity="0.015" />
      {/* Base plinth */}
      <rect x="55" y="430" width="82" height="10" rx="4" stroke="#C41E1E" strokeWidth="1.5" opacity="0.12"
        style={{'--d': '184', strokeDasharray: '184', strokeDashoffset: '184', animation: 'hDraw 0.3s ease 0.4s forwards'}} />
      <rect x="58" y="432" width="76" height="6" rx="3" fill="#C41E1E" opacity="0.015" />
      {/* Grille vertical lines */}
      <g opacity="0.035">
        {[68, 73, 78, 83, 88, 93, 98, 103, 108, 113, 118, 123].map(x => (
          <line key={`lg-${x}`} x1={x} y1="120" x2={x} y2="425" stroke="#C41E1E" strokeWidth="0.4" />
        ))}
      </g>
      {/* Grille horizontal weave */}
      <g opacity="0.015">
        {[140,155,170,185,200,215,230,245,260,275,290,305,320,335,350,365,380,395,410].map(y => (
          <line key={`lh-${y}`} x1="63" y1={y} x2="129" y2={y} stroke="#C41E1E" strokeWidth="0.25" />
        ))}
      </g>
      {/* Woofer */}
      <circle cx="96" cy="192" r="22" stroke="#C41E1E" strokeWidth="1.8" opacity="0.28" />
      <circle cx="96" cy="192" r="19" stroke="#C9A84C" strokeWidth="0.4" opacity="0.06" />
      <circle cx="96" cy="192" r="16" stroke="#C41E1E" strokeWidth="0.6" opacity="0.08" />
      <circle cx="96" cy="192" r="7" stroke="#C41E1E" strokeWidth="0.6" opacity="0.06" />
      <circle cx="96" cy="192" r="12" fill="#C41E1E" opacity="0.025" style={{animation: 'hWooferPulse 3.5s ease infinite'}} />
      <circle cx="96" cy="192" r="3" fill="#C41E1E" opacity="0.03" />
      {/* Mid-range */}
      <circle cx="96" cy="272" r="16" stroke="#C41E1E" strokeWidth="1.6" opacity="0.25" />
      <circle cx="96" cy="272" r="13" stroke="#C9A84C" strokeWidth="0.4" opacity="0.05" />
      <circle cx="96" cy="272" r="10" stroke="#C41E1E" strokeWidth="0.5" opacity="0.06" />
      <circle cx="96" cy="272" r="5" fill="#C41E1E" opacity="0.02" />
      <circle cx="96" cy="272" r="2.5" fill="#C41E1E" opacity="0.04" />
      {/* Tweeter */}
      <circle cx="96" cy="340" r="10" stroke="#C41E1E" strokeWidth="1.4" opacity="0.22"
        style={{animation: 'hTweeterGlow 4s ease infinite'}} />
      <circle cx="96" cy="340" r="7" stroke="#C9A84C" strokeWidth="0.35" opacity="0.05" />
      <circle cx="96" cy="340" r="4" stroke="#C41E1E" strokeWidth="0.4" opacity="0.06" />
      <circle cx="96" cy="340" r="1.8" fill="#C41E1E" opacity="0.05" />
      {/* Brand badge */}
      <rect x="84" y="380" width="24" height="5" rx="2.5" stroke="#C9A84C" strokeWidth="0.4" opacity="0.06" />
    </g>

    {/* ====== RIGHT SPEAKER (Hi-Fi Tower) ====== */}
    <g style={{animation: 'hFadeIn 0.8s ease 0.15s forwards', opacity: 0}}>
      <ellipse cx="704" cy="272" rx="48" ry="140" fill="url(#ambientTV)" filter="url(#gSoft)"
        style={{animation: 'hBreatheSoft 5s ease infinite 0.8s'}} />
      <rect x="668" y="112" width="72" height="320" rx="10" stroke="#C41E1E" strokeWidth="2.2" opacity="0.32"
        style={{'--d': '784', strokeDasharray: '784', strokeDashoffset: '784', animation: 'hDraw 0.8s ease 0.1s forwards'}} />
      <rect x="671" y="115" width="66" height="314" rx="8" stroke="#C41E1E" strokeWidth="0.5" opacity="0.06" />
      <rect x="666" y="107" width="76" height="10" rx="4" stroke="#C41E1E" strokeWidth="1.5" opacity="0.18" />
      <rect x="669" y="109" width="70" height="6" rx="3" fill="#C41E1E" opacity="0.015" />
      <rect x="666" y="424" width="76" height="8" rx="3" stroke="#C41E1E" strokeWidth="1.5" opacity="0.18" />
      <rect x="669" y="425" width="70" height="5" rx="2.5" fill="#C41E1E" opacity="0.015" />
      <rect x="663" y="430" width="82" height="10" rx="4" stroke="#C41E1E" strokeWidth="1.5" opacity="0.12"
        style={{'--d': '184', strokeDasharray: '184', strokeDashoffset: '184', animation: 'hDraw 0.3s ease 0.4s forwards'}} />
      <rect x="666" y="432" width="76" height="6" rx="3" fill="#C41E1E" opacity="0.015" />
      <g opacity="0.035">
        {[676, 681, 686, 691, 696, 701, 706, 711, 716, 721, 726, 731].map(x => (
          <line key={`rg-${x}`} x1={x} y1="120" x2={x} y2="425" stroke="#C41E1E" strokeWidth="0.4" />
        ))}
      </g>
      <g opacity="0.015">
        {[140,155,170,185,200,215,230,245,260,275,290,305,320,335,350,365,380,395,410].map(y => (
          <line key={`rh-${y}`} x1="671" y1={y} x2="737" y2={y} stroke="#C41E1E" strokeWidth="0.25" />
        ))}
      </g>
      <circle cx="704" cy="192" r="22" stroke="#C41E1E" strokeWidth="1.8" opacity="0.28" />
      <circle cx="704" cy="192" r="19" stroke="#C9A84C" strokeWidth="0.4" opacity="0.06" />
      <circle cx="704" cy="192" r="16" stroke="#C41E1E" strokeWidth="0.6" opacity="0.08" />
      <circle cx="704" cy="192" r="7" stroke="#C41E1E" strokeWidth="0.6" opacity="0.06" />
      <circle cx="704" cy="192" r="12" fill="#C41E1E" opacity="0.025" style={{animation: 'hWooferPulse 3.5s ease infinite 1s'}} />
      <circle cx="704" cy="192" r="3" fill="#C41E1E" opacity="0.03" />
      <circle cx="704" cy="272" r="16" stroke="#C41E1E" strokeWidth="1.6" opacity="0.25" />
      <circle cx="704" cy="272" r="13" stroke="#C9A84C" strokeWidth="0.4" opacity="0.05" />
      <circle cx="704" cy="272" r="10" stroke="#C41E1E" strokeWidth="0.5" opacity="0.06" />
      <circle cx="704" cy="272" r="5" fill="#C41E1E" opacity="0.02" />
      <circle cx="704" cy="272" r="2.5" fill="#C41E1E" opacity="0.04" />
      <circle cx="704" cy="340" r="10" stroke="#C41E1E" strokeWidth="1.4" opacity="0.25"
        style={{animation: 'hTweeterGlow 4s ease infinite 1.5s'}} />
      <circle cx="704" cy="340" r="7" stroke="#C9A84C" strokeWidth="0.35" opacity="0.05" />
      <circle cx="704" cy="340" r="4" stroke="#C41E1E" strokeWidth="0.4" opacity="0.06" />
      <circle cx="704" cy="340" r="1.8" fill="#C41E1E" opacity="0.05" />
      <rect x="692" y="380" width="24" height="5" rx="2.5" stroke="#C9A84C" strokeWidth="0.4" opacity="0.06" />
    </g>

    {/* ====== TELEVISION (Centerpiece) ====== */}
    <g style={{animation: 'hFadeIn 0.8s ease 0.05s forwards', opacity: 0}}>
      {/* Floating shadow beneath TV */}
      <ellipse cx="400" cy="435" rx="160" ry="6" fill="#C41E1E" opacity="0.04" filter="url(#gShadow8)" />

      {/* Outer bezel — ultra thin */}
      <rect x="180" y="72" width="440" height="240" rx="16" stroke="#C41E1E" strokeWidth="2.5" opacity="0.38"
        style={{'--d': '1360', strokeDasharray: '1360', strokeDashoffset: '1360', animation: 'hDraw 1s ease forwards'}} />
      <rect x="180" y="72" width="440" height="240" rx="16" stroke="#C9A84C" strokeWidth="0.6" opacity="0.04" />

      {/* Inner bezel accent */}
      <rect x="184" y="76" width="432" height="232" rx="13" stroke="#C41E1E" strokeWidth="0.8" opacity="0.12" />
      <rect x="184" y="76" width="432" height="232" rx="13" stroke="#C9A84C" strokeWidth="0.3" opacity="0.03" />

      {/* Screen */}
      <rect x="188" y="80" width="424" height="224" rx="10" fill="url(#scrGrad)" />
      <rect x="188" y="80" width="424" height="80" rx="10" fill="url(#scrGrad)" opacity="0.25" />

      {/* Screen edge highlights */}
      <rect x="188" y="80" width="424" height="1.5" fill="#C41E1E" opacity="0.03" />
      <rect x="188" y="302" width="424" height="1.5" fill="#C41E1E" opacity="0.03" />

      {/* Glass reflection */}
      <rect x="188" y="80" width="424" height="224" rx="10" fill="url(#scrReflect)" />
      <path d="M200 80 L340 80 L260 304 L188 304 Z" fill="#C9A84C" opacity="0.015"
        style={{animation: 'hSlideReflect 7s ease infinite'}} />

      {/* Top thin highlight */}
      <path d="M200 82 L600 82" stroke="#C9A84C" strokeWidth="0.5" opacity="0.025" strokeLinecap="round" />

      {/* XOAS branding */}
      <text x="400" y="207" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="34" fontWeight="700"
        fill="#C41E1E" opacity="0.06" style={{animation: 'hBreatheSoft 5s ease infinite'}}>
        XOAS
      </text>
      <text x="400" y="222" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="7" fontWeight="400"
        fill="#C9A84C" opacity="0.03" letterSpacing="5">
        SMART LIVING
      </text>

      {/* Screen UI decoration */}
      <rect x="240" y="240" width="60" height="1.5" rx="0.75" fill="#C41E1E" opacity="0.03" />
      <rect x="240" y="248" width="140" height="0.8" rx="0.4" fill="#C41E1E" opacity="0.02" />
      <rect x="240" y="254" width="100" height="0.8" rx="0.4" fill="#C41E1E" opacity="0.015" />
      <circle cx="480" cy="244" r="1.8" fill="#C41E1E" opacity="0.06" style={{animation: 'hBreatheSoft 3s ease infinite'}} />

      {/* Power indicator */}
      <circle cx="560" cy="95" r="1.2" fill="#C41E1E" opacity="0.15" style={{animation: 'hBreatheSoft 2.5s ease infinite'}} />

      {/* ====== TV STAND ====== */}
      <g>
        {/* Central column */}
        <rect x="382" y="312" width="36" height="120" rx="4" stroke="#C41E1E" strokeWidth="1.8" opacity="0.12"
          style={{'--d': '240', strokeDasharray: '240', strokeDashoffset: '240', animation: 'hDraw 0.4s ease 0.3s forwards'}} />
        <rect x="385" y="312" width="30" height="120" fill="url(#standGrad)" />
        {/* Base plate on shelf */}
        <rect x="340" y="428" width="120" height="8" rx="3" stroke="#C41E1E" strokeWidth="1.5" opacity="0.15"
          style={{'--d': '256', strokeDasharray: '256', strokeDashoffset: '256', animation: 'hDraw 0.35s ease 0.4s forwards'}} />
        <rect x="343" y="429" width="114" height="6" rx="2" fill="#C41E1E" opacity="0.015" />
        {/* Gold accent on base */}
        <rect x="345" y="430" width="110" height="2" rx="1" fill="#C9A84C" opacity="0.025" />
      </g>
    </g>

    {/* ====== Ambient sound waves ====== */}
    <g opacity="0.03" style={{animation: 'hFadeIn 2s ease 0.8s forwards', opacity: 0}}>
      <path d="M146 200 q-10,-7 -20,0" stroke="#C41E1E" strokeWidth="1" strokeLinecap="round"
        style={{animation: 'hBreatheSoft 3.5s ease infinite'}} />
      <path d="M146 200 q-16,-12 -32,0" stroke="#C41E1E" strokeWidth="0.8" strokeLinecap="round"
        style={{animation: 'hBreatheSoft 3.5s ease infinite 0.7s'}} />
      <path d="M654 200 q10,-7 20,0" stroke="#C41E1E" strokeWidth="1" strokeLinecap="round"
        style={{animation: 'hBreatheSoft 3.5s ease infinite 1.4s'}} />
      <path d="M654 200 q16,-12 32,0" stroke="#C41E1E" strokeWidth="0.8" strokeLinecap="round"
        style={{animation: 'hBreatheSoft 3.5s ease infinite 2.1s'}} />
    </g>
  </svg>
);

export default HeroIllustration;
