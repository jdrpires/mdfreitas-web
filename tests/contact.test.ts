import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContact, requestText } from "../src/lib/contact.ts";
const valid = {
  name: "Maria Silva",
  email: "maria@example.com",
  company: "",
  service: "Contabilidade",
  message: "Gostaria de conversar sobre minha empresa.",
  consent: true,
};
test("accepts a valid request and optional company", () =>
  assert.equal(validateContact(valid), null));
test("rejects invalid identity, email, service, length and missing acknowledgement", () => {
  for (const change of [
    { name: " " },
    { email: "invalido" },
    { service: "inexistente" },
    { message: "curta" },
    { message: "x".repeat(3001) },
    { consent: false },
    { company: "x".repeat(161) },
  ])
    assert.ok(validateContact({ ...valid, ...change }));
});
test("request contains the actual fields without inventing company details", () => {
  const text = requestText(valid);
  assert.ok(text.includes(valid.email));
  assert.ok(text.includes(valid.message));
  assert.ok(text.includes("Empresa: Não informada"));
});

test("company opening and regularization are valid contact topics", () => {
  for (const service of ["Abertura de Empresas", "Regularização de Empresas"])
    assert.equal(validateContact({ ...valid, service }), null);
});
