import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-charcoal">
      {/* Film Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] contrast-150 brightness-100 z-50">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Deep dark overlay */}
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[120px] z-10" />
      
      {/* Bronze Auroras */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-[120%] h-[120%] bg-gradient-to-br from-bronze/20 via-transparent to-gold/10 filter blur-[150px]"
      />
      
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-1/4 -right-1/4 w-[120%] h-[120%] bg-gradient-to-tl from-gold/15 via-transparent to-bronze/10 filter blur-[150px]"
      />
    </div>
  );
}
