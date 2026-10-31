import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
const source = "public/branding/mdfreitas-logo.png";
test("official logo retains the original RGBA pixels and real transparency", async () => {
  const meta = await sharp(source).metadata();
  assert.equal(meta.width, 1774);
  assert.equal(meta.height, 887);
  assert.equal(meta.hasAlpha, true);
  const raw = await sharp(source).ensureAlpha().raw().toBuffer();
  assert.equal(
    createHash("sha256").update(raw).digest("hex"),
    "16d32daac0d658a619f7b3342d5d1e4e74b67e97ce8c95f3720722a69af5b28e",
  );
  const stats = await sharp(source).stats();
  assert.equal(stats.isOpaque, false);
  assert.equal(stats.channels[3].min, 0);
  assert.equal(stats.channels[3].max, 255);
});
test("display variant is an exact crop of the master without recoloring or stretching", async () => {
  const expected = await sharp(source)
    .extract({ left: 226, top: 114, width: 1320, height: 708 })
    .ensureAlpha()
    .raw()
    .toBuffer();
  const actual = await sharp("public/branding/mdfreitas-logo-display.png")
    .ensureAlpha()
    .raw()
    .toBuffer();
  assert.ok(actual.equals(expected));
});
test("favicon provides multiple resolutions and a visible opaque light background", async () => {
  const ico = await readFile("src/app/favicon.ico");
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  for (let i = 0; i < 3; i++) {
    assert.equal(ico[6 + i * 16], [16, 32, 48][i]);
    const length = ico.readUInt32LE(6 + i * 16 + 8),
      offset = ico.readUInt32LE(6 + i * 16 + 12);
    const image = ico.subarray(offset, offset + length);
    assert.equal((await sharp(image).metadata()).width, [16, 32, 48][i]);
    assert.equal((await sharp(image).metadata()).channels, 4);
    assert.equal((await sharp(image).stats()).isOpaque, true);
  }
  assert.equal((await sharp("src/app/icon.png").metadata()).width, 256);
});
