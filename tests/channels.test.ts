import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validEmail,
  whatsappUrl,
  whatsappMessage,
  emailMessage,
} from "../src/lib/channels.ts";
import { isIndexable } from "../src/lib/deployment.ts";
test("configured channels reject malformed URLs, header injection and unsafe recipients", () => {
  for (const email of [
    "a@b.com?bcc=evil@example.com",
    "user?bcc=evil@domain.invalid",
    "user#fragment@domain.invalid",
    "a@b.com\r\nBcc:evil@example.com",
    "a@b.com#fragment",
    "javascript:alert(1)",
    "bad",
  ])
    assert.equal(validEmail(email), "");
  assert.equal(validEmail(" hello@example.invalid "), "hello@example.invalid");
  for (const number of [
    "+12025550100",
    "012025550100",
    "123",
    "12025550100?text=evil",
    "https://evil.example",
  ])
    assert.equal(whatsappUrl(number), "");
  assert.equal(whatsappUrl("12025550100"), "https://wa.me/12025550100");
  assert.equal(whatsappMessage("https://evil.example", "hello"), "");
  assert.equal(emailMessage("a@b.com?bcc=x", "hi", "hello"), "");
});
test("message links encode user text as data without changing the destination", () => {
  const text = "Olá & ? # <script>alert(1)</script>\nNova linha";
  const wa = new URL(whatsappMessage(whatsappUrl("12025550100"), text));
  assert.equal(wa.origin, "https://wa.me");
  assert.equal(wa.searchParams.get("text"), text);
  const mail = new URL(
    emailMessage("qa@example.invalid", "Contato\r\nTeste", text),
  );
  assert.equal(mail.pathname, "qa@example.invalid");
  assert.equal(mail.searchParams.get("body"), text);
  assert.equal(mail.searchParams.get("subject"), "Contato  Teste");
});
test("only explicitly approved Vercel production builds allow indexing", () => {
  for (const env of [
    {},
    { VERCEL_ENV: "preview", SITE_INDEXABLE: "true" },
    { VERCEL_ENV: "development", SITE_INDEXABLE: "true" },
    { VERCEL_ENV: "production" },
    { VERCEL_ENV: "production", SITE_INDEXABLE: "false" },
  ])
    assert.equal(isIndexable(env), false);
  assert.equal(
    isIndexable({ VERCEL_ENV: "production", SITE_INDEXABLE: "true" }),
    true,
  );
});
