import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { mkdir, rename, readdir, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ffmpegPath = require('ffmpeg-static');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const W = 1920;
const H = 1080;
const SLIDE_MS = 15_000;
const URL = process.env.DECK_URL ?? 'http://localhost:3000/coldstar/deck';
const OUT_WEBM = path.join(__dirname, 'coldstar-deck.webm');
const OUT_MP4 = path.join(__dirname, 'coldstar-deck.mp4');

const tmpDir = path.join(__dirname, '.deck-recording');
await rm(tmpDir, { recursive: true, force: true });
await mkdir(tmpDir, { recursive: true });

console.log(`launching chromium → ${URL}`);
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: W, height: H },
  recordVideo: { dir: tmpDir, size: { width: W, height: H } },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForSelector('.csd-deck-list button');

await page.addStyleTag({
  content: `
    .csd-shell { grid-template-columns: 1fr !important; }
    .csd-sidebar, .csd-topbar { display: none !important; }
    .csd-stage { padding: 0 !important; }
    .csd-slide { padding: 3rem 4rem !important; }
  `,
});

const slideCount = await page.evaluate(
  () => document.querySelectorAll('.csd-deck-list button').length,
);
console.log(`recording ${slideCount} slides × ${SLIDE_MS / 1000}s each = ${(slideCount * SLIDE_MS) / 1000}s total`);

for (let i = 0; i < slideCount; i++) {
  const t0 = Date.now();
  await page.evaluate((idx) => {
    const btns = document.querySelectorAll('.csd-deck-list button');
    btns[idx]?.click();
  }, i);
  await page.waitForTimeout(SLIDE_MS);
  console.log(`  slide ${i + 1}/${slideCount} done (${Date.now() - t0}ms)`);
}

await context.close();
await browser.close();

const files = await readdir(tmpDir);
const webm = files.find((f) => f.endsWith('.webm'));
if (!webm) {
  console.error('no .webm found in', tmpDir, files);
  process.exit(1);
}
await rm(OUT_WEBM, { force: true });
await rename(path.join(tmpDir, webm), OUT_WEBM);
await rm(tmpDir, { recursive: true, force: true });

console.log(`\n✓ saved webm: ${OUT_WEBM}`);

console.log(`converting → mp4 (h.264, yuv420p)...`);
await rm(OUT_MP4, { force: true });
await new Promise((resolve, reject) => {
  const args = [
    '-y',
    '-i', OUT_WEBM,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    OUT_MP4,
  ];
  const ff = spawn(ffmpegPath, args, { stdio: ['ignore', 'inherit', 'inherit'] });
  ff.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`))));
  ff.on('error', reject);
});

const mp4Stat = await stat(OUT_MP4);
console.log(`✓ saved mp4: ${OUT_MP4} (${(mp4Stat.size / 1024 / 1024).toFixed(1)} MB)`);
