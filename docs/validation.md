# Revisão técnica para homologação

Revisão local de 31/10/2026 na branch `feat/institutional-website`, destinada à PR #1. Node.js 24, npm e Chromium do sistema. Não houve deploy, merge, alteração de DNS ou contratação de serviço.

## Evidências executadas

| Verificação                          | Resultado                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| `npm ci`                             | Instalação reproduzível com o lockfile                                       |
| `npm run lint`                       | Sem erros ou avisos de código                                                |
| `npm run typecheck`                  | Geração dos tipos de rota e TypeScript strict; verificado sem `.next` prévio |
| `npm test`                           | 6 testes unitários aprovados                                                 |
| Build sem canais reais configurados  | Produção compilada e páginas pré-renderizadas                                |
| E2E `CONTACT_TEST_SCENARIO=none`     | 10 testes aprovados; build Preview, sem canais                               |
| E2E `CONTACT_TEST_SCENARIO=whatsapp` | 10 testes aprovados; WhatsApp e e-mail de teste, produção indexável          |
| E2E `CONTACT_TEST_SCENARIO=email`    | 10 testes aprovados; apenas e-mail de teste, produção indexável              |
| `npm audit --omit=dev`               | 0 vulnerabilidades reportadas nas dependências de produção                   |
| `git diff --check`                   | Sem problemas de whitespace                                                  |

Os cenários E2E foram executados separadamente com `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. Cada comando reconstruiu o site com suas variáveis; não se limitou a trocar o ambiente de um servidor já compilado. As fixtures comerciais existem apenas nos testes, usam endereços reservados e não foram publicadas. O build local final foi reconstruído com a configuração padrão vazia após os E2E.

## Cobertura de comportamento

Dez URLs verificadas com status 200, um h1, canonical oficial, descrição, Open Graph, Twitter e Organization JSON-LD mínimo. Links internos e âncoras foram percorridos e tiveram os destinos conferidos. Sitemap e imagem PNG de compartilhamento respondem; rota inexistente retorna 404. Não foram encontrados erros de hidratação ou violações de CSP no console nos fluxos testados.

Sem canais, não há formulário, campos de contato, download de TXT ou envio fictício. Com canais, os testes preenchem os campos, verificam as restrições obrigatórias, preparam a mensagem e inspecionam os URLs codificados sem abri-los externamente. As mensagens não são apresentadas como entregues. Edição posterior invalida os links preparados; localStorage e sessionStorage permanecem vazios. Há teste separado para o canal de privacidade.

Em Preview, com `SITE_INDEXABLE=true` propositalmente, HTML, header e robots continuam bloqueando indexação. Em Production com aprovação por configuração, o bloqueio é removido. A política de indexação também tem testes unitários para configuração ausente, desenvolvimento e produção não aprovada.

## Layout e acessibilidade

Todas as páginas foram verificadas em 390, 768 e 1440 px sem overflow horizontal, nos três cenários. O teste cobre foco no link de pular conteúdo, abertura do menu, Escape com retorno do foco ao botão, navegação e fechamento. Redução de movimento verificada pelo estilo computado.

Axe-core não encontrou violações automatizáveis nas regras WCAG A/AA selecionadas para Home, Contato, Serviços e Privacidade em 390 e 1440 px, incluindo os estados com formulário configurado. Isso não representa certificação ou auditoria completa com tecnologias assistivas.

Capturas para revisão visual, sem contatos de teste:

- Home: [390 px](previews/mobile.png), [768 px](previews/tablet.png), [1440 px](previews/desktop.png).
- Contato: [390 px](previews/contact-mobile.png), [768 px](previews/contact-tablet.png), [1440 px](previews/contact-desktop.png).

## Segurança e desempenho

Auditoria de produção sem vulnerabilidades reportadas. A instalação emitiu aviso de depreciação do ESLint 9 (dependência de desenvolvimento). A versão foi mantida porque os plugins React, import e JSX accessibility instalados ainda declaram suporte até ESLint 9; a migração para 10 deve acompanhar a compatibilidade desses plugins, sem forçar peers incompatíveis. Revisão dos arquivos de configuração e busca por padrões conhecidos de chaves não encontraram credenciais no código revisado. Variáveis públicas contêm somente canais e caminho de marca; não há credenciais de produção necessárias.

CSP, nosniff, política de referrer, frame-ancestors e permissões de dispositivo foram conferidos nas respostas. CSP permite scripts inline necessários à hidratação estática do Next.js e estilos inline; não é uma política estrita de nonces. A restrição de origens e a codificação dos campos foram verificadas. Em produção não há unsafe-eval. Não houve inclusão de dependências ou serviços externos novos.

Fontes locais, páginas pré-renderizadas e ausência de imagens corporativas pesadas foram mantidas. Core Web Vitals permanecem um objetivo: não existem dados de campo de um site publicado, nem uma nota Lighthouse declarada nesta revisão.

## CI e publicação

Workflow `.github/workflows/ci.yml`: Node 24, npm cache, permissões `contents: read`; qualidade com ci/lint/typecheck/test/build/audit e matriz E2E independente com Chromium instalado pelo Playwright. Não há segredos de produção ou etapa de deploy. Os comandos foram executados localmente; o resultado de uma execução hospedada do GitHub Actions não é presumido por este registro.

## Arquivos principais da revisão

- Contato: `src/components/contact-form.tsx`, `src/components/ui.tsx`, `src/app/contato/page.tsx`, `src/lib/contact.ts` e novo `src/lib/channels.ts`.
- SEO e ambientes: `src/lib/site.ts`, novo `src/lib/deployment.ts`, `src/app/layout.tsx`, `src/app/robots.ts` e descrições das páginas institucionais.
- Segurança: `next.config.ts`; privacidade: `src/app/politica-de-privacidade/page.tsx`.
- Identidade e interação: `src/components/brand.tsx`, `src/components/header.tsx` e `src/app/globals.css`.
- Automação: novo `.github/workflows/ci.yml`, novo `scripts/test-e2e.mjs`, `playwright.config.ts`, `tests/browser/site.spec.ts`, novo `tests/channels.test.ts`, `package.json` e lockfile.
- Documentação: README, `.env.example`, arquitetura, roadmap, design system, validação, texto de PR, instruções da marca e capturas.

## Pendências de homologação

PNG oficial ausente: o fallback textual permanece. Conferir resolução, proporção, legibilidade e contraste da imagem no header/rodapé quando entregue. Contatos reais, identificação jurídica, revisão dos textos, aprovação da política e definição de retenção/fornecedores dependem da responsável. Abertura e envio nos aplicativos reais devem ser validados por ela antes da publicação. Vercel, domínio e DNS não foram configurados.
