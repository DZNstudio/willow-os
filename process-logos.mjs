import sharp from 'sharp';
import path from 'node:path';

const DECK = 'C:/Users/Michael/.claude/projects/Willow Web Design/willow-os/public/coldstar/deck';
const SRC_LOGOS = 'C:/Users/Michael/Downloads/Logos';
const SRC_DL = 'C:/Users/Michael/Downloads';

/**
 * Convert any logo image into "black foreground on transparent background".
 *
 *   mode = 'light-fg' → foreground is bright (e.g. white logo on dark bg).
 *                        Brightness becomes alpha.
 *   mode = 'dark-fg'  → foreground is dark (e.g. black logo on white bg).
 *                        Inverted brightness becomes alpha.
 *
 * `low` and `high` shape the threshold curve so that pixels below `low` of
 * the chosen brightness are fully transparent, pixels above `high` are
 * fully opaque, and there's a smooth ramp in between (anti-alias preserved).
 */
async function blackOnTransparent(input, output, { mode, low, high }) {
  const img = sharp(input).removeAlpha().toColorspace('srgb');
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    // Rec. 709 luminance.
    const lum = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
    const v = mode === 'light-fg' ? lum : 255 - lum;
    let a;
    if (v <= low) a = 0;
    else if (v >= high) a = 255;
    else a = Math.round(((v - low) * 255) / (high - low));
    out[i * 4] = 0;
    out[i * 4 + 1] = 0;
    out[i * 4 + 2] = 0;
    out[i * 4 + 3] = a;
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(output);
  console.log('✓', path.basename(output), `${width}×${height}`);
}

/** Image already has an alpha channel, just colour the visible pixels black. */
async function colourBlackKeepAlpha(input, output) {
  const img = sharp(input).ensureAlpha().toColorspace('srgb');
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    out[i * 4] = 0;
    out[i * 4 + 1] = 0;
    out[i * 4 + 2] = 0;
    out[i * 4 + 3] = data[i * 4 + 3];
  }
  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(output);
  console.log('✓', path.basename(output), `${width}×${height} (alpha preserved)`);
}

await colourBlackKeepAlpha(`${SRC_DL}/coldstar-icon.png`, `${DECK}/coldstar-icon.png`);

await blackOnTransparent(`${SRC_LOGOS}/colosseum_og_card.png`, `${DECK}/colosseum.png`, {
  mode: 'light-fg', low: 100, high: 220,
});

await blackOnTransparent(`${SRC_LOGOS}/Squads.png`, `${DECK}/squads.png`, {
  mode: 'light-fg', low: 30, high: 200,
});

await blackOnTransparent(`${SRC_LOGOS}/Phantom.jpg`, `${DECK}/phantom.png`, {
  mode: 'light-fg', low: 200, high: 245,
});

await blackOnTransparent(`${SRC_LOGOS}/Ledger-logo-long.svg.png`, `${DECK}/ledger.png`, {
  mode: 'dark-fg', low: 30, high: 200,
});

console.log('\nAll logos processed → black-on-transparent.');
