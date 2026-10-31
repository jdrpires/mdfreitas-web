# Registro de validação

Verificado no ambiente de desenvolvimento em 31/10/2026, com Node.js 24 e Chromium do sistema. Configuração de contato e logotipo vazia, conforme `.env.example`.

| Verificação | Resultado |
|---|---|
| `npm run lint` | Sem erros ou avisos de código |
| `npm test` | 3 testes passaram |
| `npm run typecheck` | Sem erros |
| `npm run build` | Build de produção concluído |
| `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e` | 5 testes passaram |
| `npm audit --omit=dev` | Nenhuma vulnerabilidade reportada nas dependências de produção |
| `git diff --check` | Sem problemas de whitespace |

Os testes de navegador cobrem dez URLs de conteúdo com status 200, um h1 por página e URL canônica; layout móvel de 390 px sem overflow horizontal; abertura, navegação e fechamento do menu; download real da solicitação sem alegação de envio; sitemap, robots e página inexistente com 404.

A verificação axe-core não encontrou violações automatizáveis das regras WCAG A/AA selecionadas nas páginas inicial, contato, serviços e privacidade. Foram corrigidos contraste dos números dos cartões e nomes acessíveis dos links da marca. Essa verificação não representa auditoria completa ou certificação.

Capturas da página inicial em [desktop](previews/desktop.png) e [celular](previews/mobile.png) permitem revisão visual. Os canais externos configurados ainda precisam de teste com os dados reais da empresa. O logotipo oficial e os dados jurídicos permanecem pendentes conforme o README.
