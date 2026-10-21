/**
 * Builds the product imagery for the /setup gear catalogue.
 *
 * Sources live in `app/Components/Images/` — legacy assets from the old ROG gear
 * page alongside newer originals, none of it importable from app code. Nothing
 * is read from `public/images/setup/`, which holds generated output only, so a
 * source dropped in there would be mistaken for a built image. Every output is
 * normalised the same way so the device grid reads as one catalogue:
 *
 *   1. white studio background is flood-filled away (only where it touches the
 *      frame edge, so white keycaps and white plastics survive)
 *   2. trimmed to the product's bounding box
 *   3. centred on a square transparent canvas with a consistent optical margin
 *   4. encoded as WebP with a full-quality alpha channel
 *
 * Run with: node scripts/build-setup-images.mjs
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const LEGACY = "app/Components/Images";
const PUBLIC = "public/images/setup";

/** A pixel counts as studio background when it is bright and unsaturated. */
const WHITE_THRESHOLD = 232;
/** Guard: if this much of the frame is background the source is unusable. */
const MAX_BACKGROUND_RATIO = 0.93;
/**
 * Flat studio JPEGs often carry a one-pixel light seam along an edge from the
 * original compression. Shaving a sliver off each side before sampling stops
 * that seam surviving as a stray hairline next to the product.
 */
const EDGE_CROP_RATIO = 0.012;
const EDGE_CROP_MAX = 10;
/** Longest edge of the generated canvas. */
const CANVAS = 1200;
/** Optical padding around the product, as a fraction of its longest edge. */
const PADDING = 0.06;
/** Smallest canvas we will upscale a source to, so 225px art is not pasted 1:1. */
const MIN_UPSCALE = 800;

const WEBP = { quality: 88, alphaQuality: 100, effort: 6 };

/**
 * `removeBackground` is only needed for sources that are flat JPEGs or PNGs with
 * a baked-in white plate. Anything already carrying a real alpha channel is
 * passed through untouched.
 */
const MANIFEST = [
  // ── keyboards ────────────────────────────────────────────────────────────
  { category: "keyboards", slug: "aula-f75", source: `${LEGACY}/f75.jpg`, removeBackground: true },
  { category: "keyboards", slug: "aula-s2022", source: `${LEGACY}/s2022.jpg`, removeBackground: true },

  // ── mice ─────────────────────────────────────────────────────────────────
  { category: "mice", slug: "logitech-g-pro-wireless", source: `${LEGACY}/gpro.webp` },
  { category: "mice", slug: "aula-sc660", source: `${LEGACY}/aula.png` },
  { category: "mice", slug: "glorious-model-o-wireless", source: `${LEGACY}/model0.png` },
  { category: "mice", slug: "razer-deathadder-essential", source: `${LEGACY}/razer-deathadder-essential.png` },

  // ── audio ────────────────────────────────────────────────────────────────
  { category: "audio", slug: "kz-edx-ultra", source: `${LEGACY}/kz-edx.png` },
  { category: "audio", slug: "logitech-g935", source: `${LEGACY}/g935.webp` },
  { category: "audio", slug: "kz-castor-pro", source: `${LEGACY}/kz-castor-pro.png` },
  { category: "audio", slug: "steelseries-arctis-5", source: `${LEGACY}/att.jpg`, removeBackground: true },
  { category: "audio", slug: "corsair-hs50", source: `${LEGACY}/corsair-hs50.avif` },

  // ── monitors ─────────────────────────────────────────────────────────────
  { category: "monitors", slug: "tar-g-1440p-180hz", source: `${LEGACY}/tar-g-1440p-180hz.png` },
  { category: "monitors", slug: "zowie-xl2731", source: `${LEGACY}/zowie-front.png`, removeBackground: true },
  { category: "monitors", slug: "dell-p2014ht", source: `${LEGACY}/dell-p2014h.png`, removeBackground: true },
  { category: "monitors", slug: "aoc-cu34g2x", source: `${LEGACY}/aoc-cu34g2x.avif` },

  // ── mousepads ────────────────────────────────────────────────────────────
  { category: "mousepads", slug: "hx-mpfsl", source: `${LEGACY}/hyperx.jpg`, removeBackground: true },

  // ── controllers ──────────────────────────────────────────────────────────
  { category: "controllers", slug: "xbox-one-white", source: `${LEGACY}/XBOX-1-WHITE.webp` },
  { category: "controllers", slug: "dualshock-4", source: `${LEGACY}/images-removebg-preview.png` },
  { category: "controllers", slug: "xbox-one-tech-recon", source: `${LEGACY}/xbox-recon-tech-commons.jpg`, removeBackground: true },

  // ── ups ──────────────────────────────────────────────────────────────────
  { category: "ups", slug: "apc-bv650", source: `${LEGACY}/apc-bv650.webp`, removeBackground: true },
  { category: "ups", slug: "apc-back-ups-bx1400ui", source: `${LEGACY}/ups.png` },
];

const isBackground = (r, g, b) => r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD;

/**
 * Removes a flat studio background by flood filling inwards from the frame edge.
 * Pixels are only cleared while they stay connected to the edge, which is what
 * keeps light-coloured detail inside the product — white keycaps, a white Xbox
 * shell, specular highlights — from being punched out.
 */
function floodRemoveBackground({ data, width, height, channels }) {
  const at = (x, y) => (y * width + x) * channels;
  const background = new Uint8Array(width * height);
  const queue = [];

  const enqueue = (x, y) => {
    const i = y * width + x;
    if (background[i]) return;
    const o = at(x, y);
    if (!isBackground(data[o], data[o + 1], data[o + 2])) return;
    background[i] = 1;
    queue.push(x, y);
  };

  for (let x = 0; x < width; x++) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  for (let head = 0; head < queue.length; head += 2) {
    const x = queue[head];
    const y = queue[head + 1];
    if (x > 0) enqueue(x - 1, y);
    if (x < width - 1) enqueue(x + 1, y);
    if (y > 0) enqueue(x, y - 1);
    if (y < height - 1) enqueue(x, y + 1);
  }

  let removed = 0;
  for (let i = 0; i < background.length; i++) if (background[i]) removed++;

  const ratio = removed / (width * height);
  if (ratio > MAX_BACKGROUND_RATIO) {
    throw new Error(
      `background flood fill consumed ${(ratio * 100).toFixed(1)}% of the frame — refusing to emit a near-empty image`,
    );
  }

  for (let i = 0; i < background.length; i++) {
    if (background[i]) data[at(i % width, (i / width) | 0) + 3] = 0;
  }

  return ratio;
}

/** Bounding box of every pixel that is not fully transparent. */
function alphaBounds(data, width, height, channels) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * channels + 3] === 0) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < 0) throw new Error("image is entirely transparent");
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/**
 * Softens the alpha edge. Removing a studio background leaves a hard 1px step
 * that reads as crunchy once the image is scaled up; a sub-pixel blur on the
 * alpha channel only rounds that edge off and leaves the colours untouched.
 */
async function softenAlpha(pipeline) {
  const { data, info } = await pipeline
    .clone()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const alpha = await sharp(data, { raw: info })
    .extractChannel("alpha")
    .blur(0.7)
    .raw()
    .toBuffer();

  const pixels = info.width * info.height;
  for (let i = 0; i < pixels; i++) data[i * info.channels + 3] = alpha[i];

  return sharp(data, { raw: info }).ensureAlpha();
}

async function build(entry) {
  const outPath = path.posix.join(PUBLIC, entry.category, `${entry.slug}.webp`);

  const source = sharp(entry.source, { failOn: "none" }).ensureAlpha();
  const meta = await source.metadata();
  let pipeline = source.clone();
  let backgroundRatio = 0;

  if (entry.removeBackground) {
    const inset = Math.min(
      EDGE_CROP_MAX,
      Math.round(Math.min(meta.width, meta.height) * EDGE_CROP_RATIO),
    );

    const prepared =
      inset > 0
        ? pipeline.clone().extract({
            left: inset,
            top: inset,
            width: meta.width - inset * 2,
            height: meta.height - inset * 2,
          })
        : pipeline;

    const { data, info } = await prepared.raw().toBuffer({ resolveWithObject: true });
    backgroundRatio = floodRemoveBackground({ data, width: info.width, height: info.height, channels: info.channels });
    pipeline = sharp(data, { raw: info }).ensureAlpha();
  }

  pipeline = await softenAlpha(pipeline);

  const { data, info } = await pipeline
    .clone()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const bounds = alphaBounds(data, info.width, info.height, info.channels);

  // Scale the product so the whole catalogue shares one optical weight. Sources
  // already at or above the ceiling are left at 1:1; the few small ones are
  // lifted to MIN_UPSCALE with a smooth kernel so they do not read as blocky
  // next to the high-resolution shots in the same grid.
  const longest = Math.max(bounds.width, bounds.height);
  const scale = longest < MIN_UPSCALE ? MIN_UPSCALE / longest : Math.min(1, CANVAS / longest);
  const width = Math.max(1, Math.round(bounds.width * scale));
  const height = Math.max(1, Math.round(bounds.height * scale));

  let trimmed = pipeline.clone().extract(bounds);

  if (Math.abs(scale - 1) > 0.001) {
    trimmed = trimmed.resize(width, height, { fit: "fill", kernel: "lanczos3" });
  }

  // Square canvas + object-contain in the card means every product renders at
  // the same size regardless of whether it is a wide monitor or a tall headset.
  const side = Math.round(Math.max(width, height) * (1 + PADDING * 2));

  const canvas = await sharp({
    create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      {
        // PNG, not WebP: this is a lossless intermediate, and WebP-in-WebP would
        // stack two lossy passes on the product before it is ever displayed.
        input: await trimmed.png().toBuffer(),
        left: Math.round((side - width) / 2),
        top: Math.round((side - height) / 2),
      },
    ])
    .webp(WEBP)
    .toBuffer();

  await sharp(canvas).toFile(outPath);

  const written = await sharp(outPath).metadata();
  const kb = (Buffer.byteLength(canvas) / 1024).toFixed(0);
  const bg = backgroundRatio ? ` bg-removed ${(backgroundRatio * 100).toFixed(0)}%` : "";
  console.log(
    `${entry.category}/${entry.slug.padEnd(26)} ${String(meta.width).padStart(4)}x${String(meta.height).padEnd(4)} -> ${written.width}x${written.height}  ${kb.padStart(4)} KB${bg}`,
  );
}

const results = [];
for (const entry of MANIFEST) {
  await mkdir(path.posix.join(PUBLIC, entry.category), { recursive: true });
  try {
    await build(entry);
    results.push({ entry, ok: true });
  } catch (error) {
    results.push({ entry, ok: false, error });
    console.error(`FAILED ${entry.category}/${entry.slug}: ${error.stack || error.message}`);
  }
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} images written`);
if (failed.length) process.exitCode = 1;