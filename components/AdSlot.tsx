import { NEXT_PUBLIC_ADSENSE_CLIENT } from '@/lib/adsense-config';

interface AdSlotProps {
  slot: string; // AdSense slot ID
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  /** If true, only show on wide screens (not mobile) */
  desktopOnly?: boolean;
  /** If true, only show on mobile */
  mobileOnly?: boolean;
  className?: string;
  label?: boolean; // show "פרסומת" label above (required in some contexts)
}

/**
 * Reserves vertical space and shows an ad when AdSense is enabled.
 * Until approved, renders nothing (zero DOM, zero layout shift).
 *
 * To enable: set NEXT_PUBLIC_ADSENSE_CLIENT in lib/adsense-config.ts
 * and uncomment the script tag in app/layout.tsx
 */
export function AdSlot({
  slot,
  format = 'auto',
  desktopOnly,
  mobileOnly,
  className = '',
  label = true,
}: AdSlotProps) {
  if (!NEXT_PUBLIC_ADSENSE_CLIENT) return null;

  const visibility = desktopOnly
    ? 'hidden md:block'
    : mobileOnly
    ? 'block md:hidden'
    : 'block';

  return (
    <aside className={`${visibility} my-8 ${className}`} aria-label="פרסומת">
      {label && (
        <div className="mb-1 text-[10px] uppercase tracking-wider text-ink-faint">
          פרסומת
        </div>
      )}
      <ins
        className="adsbygoogle block"
        style={{ display: 'block', minHeight: 100 }}
        data-ad-client={NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </aside>
  );
}
