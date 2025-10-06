/**
 * Lenis smooth scrolling configuration
 * Adjust these values to customize the scrolling behavior
 */
export const lenisConfig = {
  // Linear interpolation factor (0-1)
  // Lower values = smoother but slower scrolling
  // Higher values = more responsive but less smooth
  // Recommended: 0.05-0.15
  lerp: 0.1,

  // Duration of scroll animations in seconds
  // Used for programmatic scrolling (scrollTo)
  // Recommended: 1.0-2.0
  duration: 1.2,

  // Easing function for scroll animations
  // Creates a smooth deceleration effect
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

  // Scroll direction
  orientation: "vertical" as const,

  // Touch gesture direction
  gestureOrientation: "vertical" as const,

  // Enable smooth scrolling for mouse wheel
  smoothWheel: true,

  // Mouse wheel scroll speed multiplier
  // Lower = slower, Higher = faster
  // Recommended: 0.5-2.0
  wheelMultiplier: 1,

  // Touch scroll speed multiplier
  // Higher value for more responsive touch scrolling
  // Recommended: 1.5-3.0
  touchMultiplier: 2,

  // Enable infinite scrolling
  infinite: false,

  // Auto request animation frame
  // Set to false when using custom RAF (e.g., GSAP ticker)
  autoRaf: false,
};

/**
 * Mobile-specific configuration
 * These settings are optimized for touch devices
 */
export const mobileConfig = {
  lerp: 0.15, // Slightly more responsive on mobile
  wheelMultiplier: 1.5,
  touchMultiplier: 2.5,
};

/**
 * Desktop-specific configuration
 * These settings provide the smoothest experience on desktop
 */
export const desktopConfig = {
  lerp: 0.1, // Smoother scrolling on desktop
  wheelMultiplier: 1,
  touchMultiplier: 2,
};
