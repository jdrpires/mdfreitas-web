import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const scenario = process.env.CONTACT_TEST_SCENARIO ?? "none";
const configured = scenario !== "none";
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
test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).hostname === "127.0.0.1"
      ? route.continue()
      : route.abort(),
  );
});
test("pages expose complete metadata, verified Organization and safe hydration", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      `https://mdfreitas.com.br${route === "/" ? "" : route}`,
    );
    for (const name of [
      "description",
      "twitter:title",
      "twitter:description",
      "twitter:image",
    ])
      await expect(page.locator(`meta[name="${name}"]`)).toHaveAttribute(
        "content",
        /.+/,
      );
    for (const name of ["og:title", "og:description", "og:url", "og:image"])
      await expect(
        page.locator(`meta[property="${name}"]`).first(),
      ).toHaveAttribute("content", /.+/);
    const data = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText(),
    );
    expect(data).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "M D’Freitas — Consultoria & Contabilidade",
      url: "https://mdfreitas.com.br",
    });
  }
  expect(errors).toEqual([]);
});
test("all internal link targets and fragments exist", async ({
  page,
  request,
}) => {
  const targets = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((links) => links.map((l) => l.getAttribute("href") || "")))
      if (href.startsWith("/") || href.startsWith("#"))
        targets.add(
          new URL(href, `http://127.0.0.1:3100${route}`).pathname +
            new URL(href, `http://127.0.0.1:3100${route}`).hash,
        );
  }
  for (const target of targets) {
    const url = new URL(target, "http://127.0.0.1:3100");
    expect((await request.get(url.pathname)).status()).toBe(200);
    if (url.hash) {
      await page.goto(target);
      await expect(
        page.locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`),
      ).toHaveCount(1);
    }
  }
});
for (const width of [390, 768, 1440])
  test(`layout and keyboard navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Pular para o conteúdo" }),
    ).toBeFocused();
    if (width <= 800) {
      const toggle = page.getByRole("button", { name: "Abrir menu" });
      await toggle.click();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Sobre nós" })
        .focus();
      await page.keyboard.press("Escape");
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Sobre nós" })
        .click();
      await expect(page).toHaveURL("/sobre");
      await expect(
        page.getByRole("button", { name: "Abrir menu" }),
      ).toHaveAttribute("aria-expanded", "false");
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe("auto");
  });
test("contact reflects actual configured channels without fake delivery", async ({
  page,
}) => {
  await page.goto("/contato");
  if (!configured) {
    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.getByLabel("Seu nome")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /Baixar|Preparar|Enviar/ }),
    ).toHaveCount(0);
    await expect(
      page.getByText(
        "Nenhuma solicitação pode ser enviada por este site neste momento.",
      ),
    ).toBeVisible();
    return;
  }
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.locator("input[name=name]:invalid")).toHaveCount(1);
  await expect(page.locator(".prepared-channels")).toHaveCount(0);
  await page.getByLabel("Seu nome").fill("Maria & Silva");
  await page
    .getByLabel("E-mail", { exact: true })
    .fill("maria@example.invalid");
  await page.getByLabel("Como podemos ajudar?").selectOption("Contabilidade");
  await page
    .getByLabel("Sua mensagem")
    .fill("Dúvida: <script>alert(1)</script> & impostos?");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.locator("input[name=consent]:invalid")).toHaveCount(1);
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Nenhuma mensagem foi enviada automaticamente",
  );
  const mail = new URL(
    (await page
      .getByRole("link", { name: "Abrir aplicativo de e-mail" })
      .getAttribute("href"))!,
  );
  expect(mail.protocol).toBe("mailto:");
  expect(mail.pathname).toBe("qa-contact@example.invalid");
  expect(mail.searchParams.get("body")).toContain(
    "Dúvida: <script>alert(1)</script> & impostos?",
  );
  if (scenario === "whatsapp") {
    const link = page.getByRole("link", {
      name: "Abrir WhatsApp com mensagem",
    });
    const wa = new URL((await link.getAttribute("href"))!);
    expect(wa.origin).toBe("https://wa.me");
    expect(wa.pathname).toBe("/12025550100");
    expect(wa.searchParams.get("text")).toContain("Maria & Silva");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  } else
    await expect(
      page.getByRole("link", { name: "Abrir WhatsApp com mensagem" }),
    ).toHaveCount(0);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
  await page.getByLabel("Seu nome").fill("Outro nome");
  await expect(page.locator(".prepared-channels")).toHaveCount(0);
});
test("primary CTA includes a greeting when WhatsApp is available", async ({
  page,
}) => {
  await page.goto("/");
  const link = page.getByRole("link", {
    name: "Converse com a gente",
    exact: true,
  });
  const href = (await link.getAttribute("href"))!;
  if (scenario === "whatsapp") {
    const url = new URL(href);
    expect(url.origin).toBe("https://wa.me");
    expect(url.searchParams.get("text")).toContain("Gostaria de conhecer");
  } else expect(href).toBe("/contato");
});
test("preview indexing guard and production opt-in agree across headers and robots", async ({
  page,
  request,
}) => {
  const response = await page.goto("/");
  const robots = await (await request.get("/robots.txt")).text();
  const meta = page.locator('meta[name="robots"]');
  if (scenario === "none") {
    expect(response?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
    await expect(meta).toHaveAttribute("content", "noindex, nofollow");
    expect(robots).toContain("Disallow: /");
  } else {
    expect(response?.headers()["x-robots-tag"]).toBeUndefined();
    await expect(meta).toHaveAttribute("content", "index, follow");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("https://mdfreitas.com.br/sitemap.xml");
  }
  const csp = response?.headers()["content-security-policy"];
  expect(csp).toContain("object-src 'none'");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).not.toContain("unsafe-eval");
  expect(response?.headers()["x-powered-by"]).toBeUndefined();
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(
    (await request.get("/opengraph-image")).headers()["content-type"],
  ).toContain("image/png");
  expect((await request.get("/pagina-inexistente")).status()).toBe(404);
});
test("privacy channel is independent from sales contact", async ({ page }) => {
  await page.goto("/politica-de-privacidade");
  await expect(page.getByText(/não está juridicamente aprovado/)).toBeVisible();
  if (configured)
    await expect(
      page.getByRole("link", { name: "qa-privacy@example.invalid" }),
    ).toHaveAttribute("href", "mailto:qa-privacy@example.invalid");
  else
    await expect(
      page.getByText(
        /O canal específico de privacidade ainda será disponibilizado/,
      ),
    ).toBeVisible();
});
test("automated WCAG A-AA checks in desktop and mobile", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/contato",
      "/servicos",
      "/politica-de-privacidade",
    ]) {
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(
        result.violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    }
  }
});
