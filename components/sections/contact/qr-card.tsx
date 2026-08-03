import QRCode from 'qrcode';

import { profile } from '@/constants/profile';

/**
 * Portfolio QR code.
 *
 * Generated on the server at build time and inlined as SVG markup: no runtime
 * library in the client bundle, no third-party QR image service, no network
 * request, and it scales perfectly at any size.
 */
export async function QrCard() {
  let svg: string | null = null;

  try {
    svg = await QRCode.toString(profile.siteUrl, {
      type: 'svg',
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: '#FFFFFF', light: '#00000000' },
    });
  } catch {
    // A failed QR render must never take the contact section down.
    svg = null;
  }

  if (!svg) return null;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-hairline bg-white/[0.02] p-4">
      <div
        aria-label={`QR code linking to ${profile.siteUrl}`}
        role="img"
        className="h-20 w-20 shrink-0 [&>svg]:h-full [&>svg]:w-full"
        // Output is produced locally by the qrcode library from a constant,
        // not from user input — no untrusted markup can reach this.
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <div>
        <p className="text-sm font-medium text-white">Scan to open this portfolio</p>
        <p className="mt-1 break-all font-mono text-[11px] text-muted">{profile.siteUrl}</p>
      </div>
    </div>
  );
}
