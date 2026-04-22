// AdSense configuration.
//
// When your AdSense account is approved:
// 1. Replace `null` below with your client ID (e.g. 'ca-pub-1234567890123456')
// 2. Uncomment the AdSense script tag in app/layout.tsx
// 3. Create ad units in AdSense dashboard; use their slot IDs in <AdSlot slot="..." />
//
// Until then, all <AdSlot> instances render nothing (zero layout shift, zero cost).
export const NEXT_PUBLIC_ADSENSE_CLIENT: string | null = null;

// Slot IDs for the ad placements used around the site.
// Fill these in once you've created the units in AdSense.
export const AD_SLOTS = {
  belowCalculator: '',   // under the calculator form, above "related"
  belowContent: '',      // bottom of the article / SEO content
  mobileSticky: '',      // optional sticky bottom ad on mobile
  homeGrid: '',          // inside the homepage grid
};
