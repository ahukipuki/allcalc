import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics-config';

/**
 * Loads Google Analytics 4 via next/script.
 * - Only in production (process.env.NODE_ENV check)
 * - afterInteractive: loaded after page is usable (no CWV impact)
 * - Respects Do Not Track via the inline check before gtag config
 *
 * Place inside <body> in app/layout.tsx.
 */
export function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Respect Do Not Track
            if (navigator.doNotTrack !== '1' && window.doNotTrack !== '1') {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            }
          `,
        }}
      />
    </>
  );
}
