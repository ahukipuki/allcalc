/**
 * Calculator logo mark — small rounded square with a stylized calculator.
 * Same design as the PWA icons in /public/icons/ but inline SVG so it renders
 * crisp at any size and adds no HTTP request.
 */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="כל המחשבונים"
    >
      {/* Rounded square body */}
      <rect width="40" height="40" rx="9" fill="#18181B" />

      {/* Screen (cream) */}
      <rect x="7" y="7" width="26" height="7.5" rx="1.5" fill="#FDFCF7" />

      {/* Digit bars on screen (right-aligned, ink) */}
      <rect x="24" y="9.5" width="2.5" height="2.5" rx="0.6" fill="#18181B" />
      <rect x="27.5" y="9.5" width="2" height="2.5" rx="0.6" fill="#18181B" />
      <rect x="30" y="9.5" width="2.5" height="2.5" rx="0.6" fill="#18181B" />

      {/* Button grid: 4 cols × 4 rows. Right column = amber (operators). */}
      {/* Row 1 */}
      <rect x="7" y="17" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="13" y="17" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="19" y="17" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="25" y="17" width="5" height="4" rx="1" fill="#B45309" />
      {/* Row 2 */}
      <rect x="7" y="22" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="13" y="22" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="19" y="22" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="25" y="22" width="5" height="4" rx="1" fill="#B45309" />
      {/* Row 3 */}
      <rect x="7" y="27" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="13" y="27" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="19" y="27" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="25" y="27" width="5" height="4" rx="1" fill="#B45309" />
      {/* Row 4 */}
      <rect x="7" y="32" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="13" y="32" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="19" y="32" width="5" height="4" rx="1" fill="#E8E3D2" />
      <rect x="25" y="32" width="5" height="4" rx="1" fill="#B45309" />
    </svg>
  );
}
