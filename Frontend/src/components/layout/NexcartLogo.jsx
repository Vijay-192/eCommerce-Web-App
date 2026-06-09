function NexcartLogo({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 70"
      className={className}
      aria-label="Nexcart"
    >
      <defs>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');`}</style>
      </defs>

      {/* Box hard shadow */}
      <rect x="5" y="5" width="64" height="64" fill="black"/>
      {/* Cart box white */}
      <rect x="0" y="0" width="64" height="64" fill="white" stroke="black" strokeWidth="3"/>

      {/* Cart handle */}
      <path d="M6 24 Q6 15 14 15 L24 15" fill="none" stroke="black" strokeWidth="3" strokeLinecap="square"/>
      {/* Cart basket */}
      <rect x="15" y="15" width="36" height="26" rx="0" fill="none" stroke="black" strokeWidth="2.5"/>
      {/* Bag handles */}
      <path d="M23 15 L23 9 L31 9 L31 15" fill="none" stroke="#C4D96F" strokeWidth="2.5" strokeLinecap="square"/>
      {/* Bag body fill */}
      <rect x="20" y="15" width="18" height="16" fill="#C4D96F" fillOpacity="0.35"/>
      {/* Wheel left */}
      <circle cx="24" cy="52" r="6" fill="black"/>
      {/* Wheel right */}
      <circle cx="44" cy="52" r="6" fill="black"/>
      {/* Axle */}
      <line x1="16" y1="44" x2="52" y2="44" stroke="black" strokeWidth="2.5" strokeLinecap="square"/>

      {/* Text hard shadow */}
      <text
        x="82" y="52"
        fontFamily="Pacifico, 'Comic Sans MS', cursive"
        fontSize="46"
        fill="black"
        letterSpacing="1"
      >Nexcart</text>

      {/* Main text */}
      <text
        x="80" y="50"
        fontFamily="Pacifico, 'Comic Sans MS', cursive"
        fontSize="46"
        letterSpacing="1"
      >
        <tspan fill="white">Nex</tspan>
        <tspan fill="#C4D96F">cart</tspan>
      </text>

      {/* Tagline black pill */}
      <rect x="80" y="58" width="126" height="15" fill="black"/>
      <text
        x="143" y="69"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="9"
        letterSpacing="3"
        fill="white"
      >ECOMMERCE</text>

    </svg>
  );
}

export default NexcartLogo;