import React from 'react';

interface ServicekuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'full' | 'emblem' | 'horizontal';
  theme?: 'light' | 'dark';
}

export const ServicekuLogo: React.FC<ServicekuLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  variant = 'horizontal',
  theme = 'light',
}) => {
  // SVG Emblem Graphic
  const Emblem = ({ width = 48, height = 48 }: { width?: number; height?: number }) => (
    <svg
      viewBox="0 0 360 360"
      width={width}
      height={height}
      className="shrink-0 drop-shadow-xs"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="skBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0288D1" />
          <stop offset="50%" stop-color="#0277BD" />
          <stop offset="100%" stop-color="#01579B" />
        </linearGradient>
        <linearGradient id="skGearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#37474F" />
          <stop offset="100%" stop-color="#212121" />
        </linearGradient>
        <linearGradient id="skSnowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#29B6F6" />
          <stop offset="100%" stop-color="#0288D1" />
        </linearGradient>
      </defs>

      {/* Outer Blue Arc */}
      <path
        d="M 65 200 A 120 120 0 1 1 295 180"
        stroke="url(#skBlueGrad)"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Dark Gear Behind */}
      <g transform="translate(205, 185)">
        <path
          d="
            M 60 -18 L 74 -14 L 72 4 L 58 0
            A 60 60 0 0 1 52 24
            L 65 34 L 56 48 L 42 40
            A 60 60 0 0 1 24 56
            L 29 70 L 13 76 L 7 60
            A 60 60 0 0 1 -18 60
            L -22 76 L -38 70 L -33 55
            A 60 60 0 0 1 -51 40
            L -65 48 L -73 34 L -59 25
            A 60 60 0 0 1 -61 0
            L -75 4 L -77 -14 L -63 -18
            A 60 60 0 0 1 -59 -42
            L -72 -50 L -65 -64 L -50 -56
            A 60 60 0 0 1 -32 -72
            L -37 -87 L -21 -93 L -17 -77
            A 60 60 0 0 1 7 -77
            L 13 -93 L 29 -87 L 24 -72
            A 60 60 0 0 1 42 -56
            L 56 -64 L 65 -50 L 52 -42
            A 60 60 0 0 1 58 -18 Z
          "
          fill="url(#skGearGrad)"
        />
        <circle cx="0" cy="0" r="26" fill="#FAF8F5" />
      </g>

      {/* Snowflake (Left) */}
      <g transform="translate(140, 140)" stroke="url(#skSnowGrad)" strokeWidth="6" strokeLinecap="round">
        <line x1="0" y1="-50" x2="0" y2="50" />
        <line x1="-43" y1="-25" x2="43" y2="25" />
        <line x1="-43" y1="25" x2="43" y2="-25" />
        {/* Branch chevrons */}
        <path d="M -12 -34 L 0 -22 L 12 -34" />
        <path d="M -12 34 L 0 22 L 12 34" />
        <path d="M 32 -8 L 18 -11 L 22 -24" />
        <path d="M -32 8 L -18 11 L -22 24" />
        <path d="M -32 -8 L -18 -11 L -22 -24" />
        <path d="M 32 8 L 18 11 L 22 24" />
        <circle cx="0" cy="0" r="5" fill="#0288D1" stroke="none" />
      </g>

      {/* Diagonal Wrench (Right) */}
      <g transform="translate(205, 170) rotate(-38)">
        <rect
          x="-11"
          y="-105"
          width="22"
          height="130"
          rx="5"
          fill="#212121"
          stroke="#ffffff"
          strokeWidth="4"
        />
        {/* Open Jaw */}
        <path
          d="
            M -24 -96 
            C -29 -118 -13 -144 0 -144 
            C 13 -144 29 -118 24 -96 
            L 12 -100 
            L 8 -120 
            L -8 -120 
            L -12 -100 
            Z
          "
          fill="#212121"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="24" r="15" fill="#212121" stroke="#ffffff" strokeWidth="4" />
        <circle cx="0" cy="24" r="7" fill="#ffffff" />
      </g>

      {/* Dynamic Blue Water Waves Underneath */}
      <path
        d="
          M 40 268 
          C 100 230, 170 278, 230 256 
          C 280 238, 315 230, 340 232 
          C 300 260, 245 282, 185 273 
          C 130 264, 85 282, 40 268 Z
        "
        fill="url(#skBlueGrad)"
      />
      <path
        d="
          M 65 280 
          C 120 256, 180 286, 240 272 
          C 275 264, 305 252, 325 246 
          C 290 274, 250 290, 195 286 
          C 145 282, 100 293, 65 280 Z
        "
        fill="#01579B"
      />
    </svg>
  );

  if (variant === 'emblem') {
    const sizeMap = {
      sm: 36,
      md: 48,
      lg: 64,
      xl: 88,
    };
    const s = sizeMap[size];
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem width={s} height={s} />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <Emblem width={96} height={96} />
        <div className="mt-2">
          <span
            className={`text-3xl font-black italic tracking-tight font-sans ${
              theme === 'dark' ? 'text-white' : 'text-[#0B4F9C]'
            }`}
          >
            Serviceku
          </span>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span className="w-6 h-[1.5px] bg-[#0B4F9C]"></span>
            <span
              className={`text-[11px] font-extrabold uppercase tracking-widest ${
                theme === 'dark' ? 'text-[#90CAF9]' : 'text-[#0B4F9C]'
              }`}
            >
              ELEKTRONIK TERBAIK
            </span>
            <span className="w-6 h-[1.5px] bg-[#0B4F9C]"></span>
          </div>
          {showSubtitle && (
            <p
              className={`text-[9.5px] font-bold uppercase tracking-wider mt-1 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              -SPESIALIS PENDINGIN DAN MESIN ELEKTRONIK-
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal
  const sizeMap = {
    sm: { img: 36, title: 'text-lg', sub: 'text-[9px]', tag: 'text-[7.5px]' },
    md: { img: 48, title: 'text-2xl', sub: 'text-[10px]', tag: 'text-[8.5px]' },
    lg: { img: 56, title: 'text-3xl', sub: 'text-xs', tag: 'text-[9.5px]' },
    xl: { img: 72, title: 'text-4xl', sub: 'text-sm', tag: 'text-[11px]' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <Emblem width={currentSize.img} height={currentSize.img} />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-black italic tracking-tight ${currentSize.title} ${
              theme === 'dark' ? 'text-white' : 'text-[#0B4F9C]'
            }`}
          >
            Service<span className="text-[#0288D1]">ku</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1 py-0.2 rounded bg-[#0B4F9C] text-white">
            PRO
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-1 leading-none">
          <span className="w-3.5 h-[1.5px] bg-[#0B4F9C]"></span>
          <span
            className={`font-extrabold uppercase tracking-wider ${currentSize.sub} ${
              theme === 'dark' ? 'text-[#90CAF9]' : 'text-[#0B4F9C]'
            }`}
          >
            ELEKTRONIK TERBAIK
          </span>
          <span className="w-3.5 h-[1.5px] bg-[#0B4F9C]"></span>
        </div>

        {showSubtitle && (
          <span
            className={`font-bold uppercase tracking-tight mt-0.5 leading-none ${currentSize.tag} ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
            }`}
          >
            -SPESIALIS PENDINGIN & MESIN ELEKTRONIK-
          </span>
        )}
      </div>
    </div>
  );
};
