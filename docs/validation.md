# Revisão técnica para homologação

Revisão local de 31/10/2026 na branch `feat/institutional-website`, destinada à PR #1. Node.js 24, npm e Chromium do sistema. Não houve deploy, merge, alteração de DNS ou contratação de serviço.

## Evidências executadas

| Verificação                          | Resultado                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------- |
| `npm ci`                             | Instalação reproduzível com o lockfile                                                |
| `npm run lint`                       | Sem erros ou avisos de código                                                         |
| `npm run typecheck`                  | Geração dos tipos de rota e TypeScript strict; verificado sem `.next` prévio          |
| `npm test`                           | 10 testes unitários aprovados                                                         |
| Build sem canais reais configurados  | Produção compilada e páginas pré-renderizadas                                         |
| E2E `CONTACT_TEST_SCENARIO=none`     | 14 testes aprovados; build Preview, sem canais                                        |
| E2E `CONTACT_TEST_SCENARIO=whatsapp` | 14 testes aprovados; WhatsApp e e-mail de teste, produção indexável                   |
| E2E `CONTACT_TEST_SCENARIO=official` | 14 testes aprovados; contatos públicos oficiais, sem variáveis comerciais de override |
| E2E `CONTACT_TEST_SCENARIO=email`    | 14 testes aprovados; apenas e-mail de teste, produção indexável                       |
| `npm audit --omit=dev`               | 0 vulnerabilidades reportadas nas dependências de produção                            |
| `git diff --check`                   | Sem problemas de whitespace                                                           |

Os cenários E2E foram executados separadamente com `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. Cada comando reconstruiu o site com suas variáveis; não se limitou a trocar o ambiente de um servidor já compilado. As fixtures comerciais existem apenas nos testes, usam endereços reservados e não foram publicadas. O build local final foi reconstruído com os contatos comerciais oficiais após os E2E.

## Cobertura de comportamento

Onze URLs de conteúdo verificadas com status 200, um h1, canonical oficial, descrição, Open Graph, Twitter e Organization JSON-LD mínimo. Links internos e âncoras foram percorridos e tiveram os destinos conferidos. Sitemap e imagem PNG de compartilhamento respondem; rota inexistente retorna 404. Não foram encontrados erros de hidratação ou violações de CSP no console nos fluxos testados.

Sem canais, não há formulário, campos de contato, download de TXT ou envio fictício. Com canais, os testes preenchem os campos, verificam as restrições obrigatórias, preparam a mensagem e inspecionam os URLs codificados sem abri-los externamente. As mensagens não são apresentadas como entregues. Edição posterior invalida os links preparados; localStorage e sessionStorage permanecem vazios. Há teste separado para o canal de privacidade.

Em Preview, com `SITE_INDEXABLE=true` propositalmente, HTML, header e robots continuam bloqueando indexação. Em Production com aprovação por configuração, o bloqueio é removido. A política de indexação também tem testes unitários para configuração ausente, desenvolvimento e produção não aprovada.

## Layout e acessibilidade

Todas as páginas foram verificadas em 390, 768 e 1440 px sem overflow horizontal, nos quatro cenários. O teste cobre foco no link de pular conteúdo, abertura do menu, Escape com retorno do foco ao botão, navegação e fechamento. Redução de movimento verificada pelo estilo computado.

Axe-core não encontrou violações automatizáveis nas regras WCAG A/AA selecionadas para Home, Contato, Serviços, Abertura, Regularização e Privacidade em 390 e 1440 px, incluindo os estados com formulário configurado. Isso não representa certificação ou auditoria completa com tecnologias assistivas.

Capturas para revisão visual, com os contatos oficiais e sem fixtures:

- Home: [390 px](previews/mobile.png), [768 px](previews/tablet.png), [1440 px](previews/desktop.png).
- Dados públicos: novo `src/lib/business.ts`, `.env.example`, Home, Sobre, Contato e rodapé.
- Serviços: catálogo, validação, sitemap e redirecionamento em `src/app/abertura-de-empresas/page.tsx`.
- Contato: [390 px](previews/contact-mobile.png), [768 px](previews/contact-tablet.png), [1440 px](previews/contact-desktop.png).
- Serviços: [desktop](previews/services-desktop.png), [mobile](previews/services-mobile.png).
- Abertura: [desktop](previews/opening-desktop.png), [mobile](previews/opening-mobile.png).
- Regularização: [desktop](previews/regularization-desktop.png), [mobile](previews/regularization-mobile.png).

## Segurança e desempenho

Auditoria de produção sem vulnerabilidades reportadas. A instalação emitiu aviso de depreciação do ESLint 9 (dependência de desenvolvimento). A versão foi mantida porque os plugins React, import e JSX accessibility instalados ainda declaram suporte até ESLint 9; a migração para 10 deve acompanhar a compatibilidade desses plugins, sem forçar peers incompatíveis. Revisão dos arquivos de configuração e busca por padrões conhecidos de chaves não encontraram credenciais no código revisado. Variáveis públicas contêm somente canais e caminho de marca; não há credenciais de produção necessárias.

CSP, nosniff, política de referrer, frame-ancestors e permissões de dispositivo foram conferidos nas respostas. CSP permite scripts inline necessários à hidratação estática do Next.js e estilos inline; não é uma política estrita de nonces. A restrição de origens e a codificação dos campos foram verificadas. Em produção não há unsafe-eval. Não houve inclusão de dependências ou serviços externos novos.

Fontes locais, páginas pré-renderizadas e ausência de imagens corporativas pesadas foram mantidas. Core Web Vitals permanecem um objetivo: não existem dados de campo de um site publicado, nem uma nota Lighthouse declarada nesta revisão.

## CI e publicação

Workflow `.github/workflows/ci.yml`: Node 24, npm cache, permissões `contents: read`; qualidade com ci/lint/typecheck/test/build/audit e matriz E2E independente com Chromium instalado pelo Playwright. Não há segredos de produção ou etapa de deploy. Os comandos foram executados localmente. A execução hospedada anterior da PR foi consultada e terminou com sucesso: https://github.com/jdrpires/mdfreitas-web/actions/runs/41198169177. Foram atualizadas checkout/setup-node/upload-artifact para v5 (Node 24) e fixado Ubuntu 24.04, a partir dos avisos observados nessa execução. A execução correspondente a esta atualização deve ser consultada pelo link informado na entrega; o status anterior não substitui a validação do novo commit.

## Arquivos principais da atualização

- Marca: `public/branding/mdfreitas-logo.png`, `public/branding/mdfreitas-logo-display.png`, `src/app/favicon.ico`, `src/app/icon.png`, `scripts/branding.mjs` e `tests/branding.test.ts`.
- Componentes e layout: `src/components/brand.tsx`, `src/components/footer.tsx` e `src/app/globals.css`.
- Dados comerciais: novo `src/lib/business.ts`, `src/lib/site.ts` e `.env.example`.
- Conteúdo: `src/app/page.tsx`, páginas Sobre, Contato, Serviços e Política de Privacidade.
- Portfólio e páginas: `src/lib/business.ts`, `src/lib/site.ts`, `src/app/servicos/page.tsx`, `src/app/abertura-de-empresas/page.tsx`, nova `src/app/regularizacao-de-empresas/page.tsx`, `src/app/sitemap.ts`, `src/components/ui.tsx`, `src/components/footer.tsx` e testes de formulário/navegador.
- CI e navegador: `.github/workflows/ci.yml`, `scripts/test-e2e.mjs` e `tests/browser/site.spec.ts`.
- Documentação: README, arquitetura, roadmap, design system, validação, texto de PR, instruções da marca e capturas em `docs/previews/`.

## Atualização de dados e conteúdo

Contatos oficiais padrão: WhatsApp +55 16 99737-9559 e contato@mdfreitas.com.br. Endereço informado: Rua Aquidaban, 1, Sala 2, Centro, São Carlos — SP. Responsável informada: Monica Freitas. A Home usa os dois textos aprovados. Não foram criados histórico profissional, certificações ou resultados.

O portfólio definitivo contém sete serviços, disponíveis na Home, página de Serviços, navegação do rodapé e seleção do formulário. Abertura de Empresas responde novamente com 200; Regularização de Empresas tem uma nova rota. Ambas aparecem no sitemap, têm SEO específico e apresentam os títulos e descrições fornecidos. A suíte confere esses textos, destinos e metadados, além dos layouts de 390, 768 e 1440 px.

Os textos institucionais e a minuta foram aprovados para implementação. A política continua explicitamente sujeita à validação jurídica final. O posicionamento da Home foi preservado integralmente. Nenhum serviço promete deferimento, eliminação de multas, economia garantida ou prazo fixo.

## Pendências de homologação

A marca oficial já está incorporada. A validação humana final do tamanho e legibilidade do logo e do favicon deve integrar a homologação, especialmente em telas de alta densidade. Não há pendência de acesso ao PNG.

Os contatos comerciais estão configurados. Ainda dependem da responsável: canal específico de privacidade, identificação jurídica e validação dos registros (CNPJ/CRC não publicados), validação jurídica final da minuta e definição de retenção/fornecedores. O envio final nos aplicativos deve ser homologado pela responsável. Vercel, domínio e DNS não foram configurados. Não houve merge ou publicação em produção.

## Auditoria do arquivo de marca

Fonte: arquivo `M D’FreITAS Luxury Consultancy Logo.png` da main, commit `5c601f5`. Foi lido via git sem mesclar a branch principal ou sobrescrever alterações de terceiros.

- Original: 1774 × 887 px, RGBA, 264.142 bytes. Transparência real: canal alpha varia de 0 a 255; imagem não opaca.
- PNG integral otimizado: `public/branding/mdfreitas-logo.png`, 219.576 bytes, redução aproximada de 17%. Comparação de todos os pixels RGBA com o original retornou igualdade exata.
- SHA-256 do buffer RGBA decodificado: `16d32daac0d658a619f7b3342d5d1e4e74b67e97ce8c95f3720722a69af5b28e`.
- Variante de exibição: recorte exato x=226, y=114, 1320 × 708 px. A comparação com a mesma região do master é um teste automatizado. Não há ajuste de cor, desenho ou distorção. O master preserva pixels de opacidade quase nula nas margens.
- Favicon: monograma extraído da região x=574, y=114, 636 × 388 px; versões 16/32/48 no ICO e 256 no PNG, com proporção preservada e fundo Paper para legibilidade em abas claras ou escuras.
- Header e rodapé usam a imagem oficial, alt descritivo, proporção preservada e superfície clara. O navegador recebe PNG sem conversão com perdas. Os testes verificam carregamento, fundo de apoio inclusive em contexto escuro e respostas dos ícones.

As capturas incluem a imagem real. Nenhuma parte do monograma foi recriada com CSS, fontes ou geração de imagem.
