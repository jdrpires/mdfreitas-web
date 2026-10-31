import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/sobre",
  "/servicos",
  "/contabilidade-consultiva",
  "/abertura-de-empresas",
  "/conteudos",
  "/contato",
  "/politica-de-privacidade",
  "/conteudos/contabilidade-consultiva",
  "/conteudos/planejamento-empresarial",
];
test("all pages render one h1 and canonical metadata", async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      `https://mdfreitas.com.br${route === "/" ? "" : route}`,
    );
  }
});
test("mobile navigation and layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Sobre nós" })
    .click();
  await expect(page).toHaveURL("/sobre");
  await expect(
    page.getByRole("button", { name: "Abrir menu" }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("unconfigured contact downloads request and never claims delivery", async ({
  page,
}) => {
  await page.goto("/contato");
  await page.getByLabel("Seu nome").fill("Maria Silva");
  await page.getByLabel("E-mail", { exact: true }).fill("maria@example.com");
  await page.getByLabel("Como podemos ajudar?").selectOption("Contabilidade");
  await page
    .getByLabel("Sua mensagem")
    .fill("Quero entender os serviços para minha empresa.");
  await page.getByRole("checkbox").check();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Baixar solicitação" }).click();
  expect((await download).suggestedFilename()).toBe(
    "solicitacao-mdfreitas.txt",
  );
  await expect(page.getByRole("status")).toContainText(
    "Nenhuma mensagem foi enviada",
  );
});
test("sitemap, robots and unknown route", async ({ request }) => {
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "https://mdfreitas.com.br/sitemap.xml",
  );
  expect((await request.get("/pagina-inexistente")).status()).toBe(404);
});

test("core pages meet automated WCAG A/AA checks", async ({ page }) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  for (const route of [
    "/",
    "/contato",
    "/servicos",
    "/politica-de-privacidade",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  }
});
