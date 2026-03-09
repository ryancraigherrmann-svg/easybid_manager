interface EzBidLogoProps {
  size?: number;
  collapsed?: boolean;
}

export default function EzBidLogo({ size = 36, collapsed = false }: EzBidLogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, userSelect: 'none' }}>
      {/* Icon: stylized bid/gavel mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield / badge shape */}
        <rect x="4" y="4" width="40" height="40" rx="10" fill="#3B6E8F" />
        {/* Inner accent stripe */}
        <rect x="4" y="4" width="40" height="14" rx="10" fill="#4A8DB7" />
        {/* Gavel head */}
        <rect
          x="14"
          y="13"
          width="20"
          height="8"
          rx="3"
          fill="#FFFFFF"
          transform="rotate(-20 24 17)"
        />
        {/* Gavel handle */}
        <rect
          x="22"
          y="20"
          width="4"
          height="16"
          rx="2"
          fill="#CBD5E1"
        />
        {/* Strike plate */}
        <rect x="13" y="36" width="22" height="4" rx="2" fill="#FFFFFF" opacity="0.85" />
      </svg>

      {!collapsed && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span
            style={{
              fontSize: size * 0.5,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}
          >
            ezbid<span style={{ color: '#7EB8DA' }}>manager</span>
          </span>
          <span
            style={{
              fontSize: size * 0.22,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}
          >
            Bid Management
          </span>
        </div>
      )}
    </div>
  );
}
