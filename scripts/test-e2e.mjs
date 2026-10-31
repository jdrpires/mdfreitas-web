import { spawnSync } from "node:child_process";
// Test-only fixtures. Never substitute these values for the actual business contacts.
const requested = process.env.CONTACT_TEST_SCENARIO;
const scenarios = requested
  ? [requested]
  : ["none", "whatsapp", "email", "official"];
for (const scenario of scenarios) {
  if (!["none", "whatsapp", "email", "official"].includes(scenario))
    throw new Error("Unknown CONTACT_TEST_SCENARIO");
  const env = {
    ...process.env,
    CONTACT_TEST_SCENARIO: scenario,
    NEXT_PUBLIC_CONTACT_EMAIL:
      scenario === "none" ? "" : "qa-contact@example.invalid",
    NEXT_PUBLIC_WHATSAPP_NUMBER: scenario === "whatsapp" ? "12025550100" : "",
    NEXT_PUBLIC_PRIVACY_EMAIL:
      scenario === "none" ? "" : "qa-privacy@example.invalid",
    NEXT_PUBLIC_LOGO_PATH: "",
    VERCEL_ENV: scenario === "none" ? "preview" : "production",
    SITE_INDEXABLE: "true",
  };
  if (scenario === "official") {
    delete env.NEXT_PUBLIC_CONTACT_EMAIL;
    delete env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    env.NEXT_PUBLIC_PRIVACY_EMAIL = "";
  }
  console.log(`\nE2E scenario: ${scenario} (${env.VERCEL_ENV})`);
  for (const args of [
    ["run", "build"],
    ["exec", "--", "playwright", "test"],
  ]) {
    const result = spawnSync("npm", args, { env, stdio: "inherit" });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
}
