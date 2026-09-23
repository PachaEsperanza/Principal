// Íconos simples, tipo dibujo infantil — formas planas, sin detalle técnico.

// Ícono envuelto con un pequeño flote/balanceo continuo.
export const FloatIcon = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div
    style={{
      display: 'inline-block',
      animation: `sintropico-float 3.6s ease-in-out ${delay}s infinite`,
    }}
  >
    {children}
  </div>
);

export const IconCacao = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <ellipse cx="32" cy="34" rx="16" ry="24" fill="#8C4A2F" />
    <path d="M32 12 C 26 22, 26 46, 32 56" stroke="#6B3620" strokeWidth="2.5" fill="none" />
    <path d="M32 12 C 38 22, 38 46, 32 56" stroke="#6B3620" strokeWidth="2.5" fill="none" />
    <ellipse cx="32" cy="8" rx="4" ry="5" fill="#5C7A3A" />
  </svg>
);

export const IconPlatano = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M16 46 C 16 20, 40 14, 48 20 C 44 18, 24 22, 22 46 C 22 52, 30 54, 36 50"
      fill="#E8B93C" stroke="#C8961F" strokeWidth="1.5" />
    <ellipse cx="47" cy="19" rx="4" ry="3" fill="#8C4A2F" />
  </svg>
);

export const IconPina = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <polygon points="32,4 26,16 38,16" fill="#5C7A3A" />
    <polygon points="32,4 20,18 30,15" fill="#6E9247" />
    <polygon points="32,4 44,18 34,15" fill="#6E9247" />
    <ellipse cx="32" cy="40" rx="16" ry="20" fill="#D9A441" />
    <ellipse cx="32" cy="40" rx="16" ry="20" fill="none" stroke="#B8842F" strokeWidth="1.5" />
  </svg>
);

export const IconYuca = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M28 10 C 20 24, 20 44, 30 58 C 34 44, 34 24, 36 10 Z" fill="#D9C4A0" />
    <ellipse cx="20" cy="12" rx="6" ry="3" fill="#5C7A3A" transform="rotate(-30 20 12)" />
    <ellipse cx="40" cy="10" rx="6" ry="3" fill="#5C7A3A" transform="rotate(20 40 10)" />
  </svg>
);

export const IconNaranja = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="36" r="20" fill="#E8912B" />
    <ellipse cx="32" cy="14" rx="5" ry="4" fill="#5C7A3A" />
  </svg>
);

export const IconGuayaba = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="36" r="18" fill="#A8C97F" />
    <ellipse cx="30" cy="16" rx="4" ry="6" fill="#5C7A3A" />
  </svg>
);

export const IconPapaya = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <ellipse cx="32" cy="34" rx="15" ry="24" fill="#E8B93C" />
    <ellipse cx="26" cy="12" rx="4" ry="3" fill="#5C7A3A" />
  </svg>
);

export const IconLima = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="34" r="18" fill="#8FAE4E" />
    <ellipse cx="32" cy="14" rx="4" ry="3" fill="#5C7A3A" />
  </svg>
);

export const IconGuaba = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M18 14 C 30 12, 46 20, 46 34 C 46 46, 34 52, 22 48 C 30 44, 38 34, 34 22 C 30 14, 22 14, 18 14 Z"
      fill="#8FAE4E" />
  </svg>
);

export const IconPijuayo = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="24" cy="28" r="9" fill="#C8551E" />
    <circle cx="38" cy="26" r="9" fill="#D9662A" />
    <circle cx="31" cy="40" r="9" fill="#C8551E" />
    <path d="M31 6 C 20 12, 20 20, 22 24" stroke="#5C7A3A" strokeWidth="3" fill="none" />
    <path d="M31 6 C 42 12, 42 20, 40 24" stroke="#5C7A3A" strokeWidth="3" fill="none" />
  </svg>
);

export const IconArbol = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="28" y="38" width="8" height="18" fill="#7A5230" />
    <circle cx="32" cy="26" r="20" fill="#3E6B3E" />
  </svg>
);

export const IconAbeja = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <ellipse cx="24" cy="28" rx="10" ry="8" fill="#F0F0F0" opacity="0.55" />
    <ellipse cx="40" cy="28" rx="10" ry="8" fill="#F0F0F0" opacity="0.55" />
    <ellipse cx="32" cy="36" rx="14" ry="11" fill="#2A2010" />
    <rect x="20" y="30" width="24" height="5" fill="#E8B93C" />
    <rect x="20" y="40" width="24" height="5" fill="#E8B93C" />
  </svg>
);

export const IconMoneda = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="22" fill="#D9A441" />
    <circle cx="32" cy="32" r="22" fill="none" stroke="#B8842F" strokeWidth="2" />
    <text x="32" y="40" fontSize="20" fontFamily="sans-serif" fill="#4A2F0E" textAnchor="middle" fontWeight="bold">S/</text>
  </svg>
);

export const IconAbono = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <ellipse cx="32" cy="46" rx="22" ry="8" fill="#5C4326" />
    <ellipse cx="32" cy="40" rx="20" ry="8" fill="#7A5230" />
    <path d="M20 24 C 18 32, 22 36, 26 34 C 24 30, 24 26, 20 24 Z" fill="#5C7A3A" />
    <path d="M44 22 C 46 30, 42 34, 38 32 C 40 28, 40 24, 44 22 Z" fill="#6E9247" />
  </svg>
);

export const IconSol = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="14" fill="#E8B93C" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <rect
        key={a}
        x="30.5" y="4" width="3" height="10" rx="1.5"
        fill="#E8B93C"
        transform={`rotate(${a} 32 32)`}
      />
    ))}
  </svg>
);
