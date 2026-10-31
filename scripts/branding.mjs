import sharp from "sharp";
import fs from "node:fs/promises";
// Deterministic asset conversion: no drawing, recoloring, flattening of the master or generative editing.
const source = "public/branding/mdfreitas-logo.png";
const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
function visibleBounds(maxY = info.height) {
  let l = info.width,
    t = info.height,
    r = -1,
    b = -1;
  for (let y = 0; y < maxY; y++)
    for (let x = 0; x < info.width; x++)
      if (data[(y * info.width + x) * 4 + 3] >= 8) {
        l = Math.min(l, x);
        t = Math.min(t, y);
        r = Math.max(r, x);
        b = Math.max(b, y);
      }
  const pad = 12;
  return {
    left: Math.max(0, l - pad),
    top: Math.max(0, t - pad),
    width: Math.min(info.width - 1, r + pad) - Math.max(0, l - pad) + 1,
    height: Math.min(info.height - 1, b + pad) - Math.max(0, t - pad) + 1,
  };
}
// The very faint alpha 1–7 speckles outside the visible art are retained in the full master.
const display = visibleBounds(),
  monogram = visibleBounds(515);
await sharp(source)
  .extract(display)
  .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
  .toFile("public/branding/mdfreitas-logo-display.png");
const mark = await sharp(source).extract(monogram).png().toBuffer();
async function icon(size) {
  return sharp(mark)
    .resize(size - 4, size - 4, { fit: "contain", background: "#fcfaf7" })
    .extend({ top: 2, bottom: 2, left: 2, right: 2, background: "#fcfaf7" })
    .flatten({ background: "#fcfaf7" })
    .ensureAlpha()
    .png()
    .toBuffer();
}
await fs.writeFile("src/app/icon.png", await icon(256));
const sizes = [16, 32, 48];
const buffers = await Promise.all(sizes.map(icon));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
for (let i = 0; i < sizes.length; i++) {
  const p = 6 + i * 16;
  header[p] = sizes[i];
  header[p + 1] = sizes[i];
  header.writeUInt16LE(1, p + 4);
  header.writeUInt16LE(32, p + 6);
  header.writeUInt32LE(buffers[i].length, p + 8);
  header.writeUInt32LE(offset, p + 12);
  offset += buffers[i].length;
}
await fs.writeFile("src/app/favicon.ico", Buffer.concat([header, ...buffers]));
console.log(JSON.stringify({ display, monogram, iconSizes: sizes }, null, 2));
