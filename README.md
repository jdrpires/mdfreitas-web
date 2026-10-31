# M D’Freitas — Consultoria & Contabilidade

Site institucional em português brasileiro, preparado para homologação. Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4 e Lucide. Montserrat e Lato servidas localmente. Repositório: `jdrpires/mdfreitas-web`; branch de trabalho: `feat/institutional-website`; revisão na [PR #1](https://github.com/jdrpires/mdfreitas-web/pull/1).

## Executar localmente

Node.js 24 LTS e npm. A versão está em `.nvmrc` e `package.json`.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Acesse http://localhost:3000. Se o cache padrão não for gravável, acrescente `--cache /tmp/mdfreitas-npm-cache` ao comando npm de instalação.

## Configuração

Variáveis `NEXT_PUBLIC_*` são públicas e incorporadas ao build. Não incluir senhas ou tokens. Reconstruir o site após alterações.

| Variável                      | Comportamento                                                                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Padrão confirmado: `5516997379559`. Pode ser substituído por número internacional válido. Valor vazio desativa o canal.            |
| `NEXT_PUBLIC_CONTACT_EMAIL`   | Padrão confirmado: `contato@mdfreitas.com.br`. Valor vazio desativa o canal; valores inválidos não o habilitam.                    |
| `NEXT_PUBLIC_PRIVACY_EMAIL`   | Canal específico para exercício de direitos LGPD, confirmado pela responsável. Independente do comercial.                          |
| `NEXT_PUBLIC_LOGO_PATH`       | Opcional. Sem valor, usa a marca oficial incorporada. A exibição usa a variante de margens reduzidas; o PNG integral é preservado. |
| `SITE_INDEXABLE`              | Variável de servidor. Apenas `true` junto de `VERCEL_ENV=production` permite indexação. Manter `false` até aprovação.              |

`VERCEL_ENV` é definido pela Vercel. Previews e execução local permanecem com `noindex, nofollow` no HTML e `X-Robots-Tag`, além de `Disallow: /` em robots.txt, mesmo se `SITE_INDEXABLE=true`. O ambiente oficial, depois de aprovado, precisa de `SITE_INDEXABLE=true` no escopo Production; nesse caso os bloqueios são retirados. `noindex` não é proteção de acesso: para conteúdo restrito, usar os controles de acesso da hospedagem.

## Contato e privacidade

Sem WhatsApp ou e-mail válido (quando desativados explicitamente), o site informa que os canais ainda serão disponibilizados. Não mostra campos para coleta de contato, download de TXT ou envio fictício.

Com canais válidos, o formulário valida os dados e prepara links de WhatsApp e/ou e-mail. O visitante abre o canal e conclui o envio por lá; não há confirmação de entrega automática. O CTA principal do WhatsApp inclui uma mensagem inicial. Não há API de envio, persistência de leads ou serviços novos. A aplicação mantém o formulário apenas em memória. Ao abrir um canal externo, o conteúdo já pode ser processado pelo serviço antes da confirmação de envio. Não compartilhar senhas, documentos ou dados financeiros sensíveis.

## Verificações

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm audit --omit=dev
npx playwright install chromium
npm run test:e2e
```

`typecheck` gera os tipos de rotas antes do TypeScript, inclusive em checkout limpo. `test:e2e` faz builds separados e executa Chromium nos cenários `none`, `whatsapp`, `email` e `official`; usa fixtures ou os dados públicos aprovados, sem abrir os canais externos. Para rodar um cenário: `CONTACT_TEST_SCENARIO=none npm run test:e2e`. Na máquina desta revisão, o navegador é selecionado com `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`.

A porta 3100 precisa estar livre. Os E2E substituem `.next` por builds de cenários, alguns com contatos fictícios identificados como fixtures no código. Após os testes, sempre execute `npm run build` novamente com a configuração real antes de usar o servidor normal ou preparar uma publicação. Nenhum teste faz deploy.

A CI em `.github/workflows/ci.yml` executa instalação, lint, tipos, unitários, build e auditoria; um job separado testa os quatro cenários com Chromium. Usa Node 24, cache npm e permissão somente de leitura de conteúdo. Não usa segredos de produção nem configura publicação.

## Páginas e SEO

Home, Sobre, Serviços, Contabilidade Consultiva, Abertura de Empresas, Regularização de Empresas, Conteúdos, Contato e Política de Privacidade, além de dois artigos. As páginas de abertura e regularização respondem com 200 e possuem metadados específicos, links de navegação e inclusão no sitemap. Inclui metadata individual, canonical oficial, Open Graph/Twitter, imagem de compartilhamento, sitemap, robots, HTML semântico e JSON-LD `Organization` apenas com nome e domínio. Não há dados estruturados de endereço, avaliações ou registros não confirmados.

## Preparação para Vercel

1. Após autorização, importar o repositório como projeto Next.js, com Node 24 e build `npm run build`. Não há etapa de banco de dados.
2. Conferir os contatos comerciais já configurados e definir o canal de privacidade nos escopos desejados. Conferir a imagem oficial já incorporada ao repositório. Manter `SITE_INDEXABLE=false` durante a homologação.
3. Gerar um Preview Deployment para revisar o visual e os fluxos. Confirmar `VERCEL_ENV=preview`, HTML `noindex`, header `X-Robots-Tag` e robots.txt. Proteger o preview na hospedagem se necessário.
4. Após aprovação de conteúdo, marca e política, preparar o ambiente Production com os dados reais e `SITE_INDEXABLE=true`. A Vercel deverá fornecer `VERCEL_ENV=production`.
5. A associação futura de `mdfreitas.com.br` e a alteração de DNS exigem uma etapa autorizada separada. O domínio canônico já está definido em `src/lib/site.ts`; não foi configurado nesta revisão.
6. Depois de uma publicação autorizada, conferir que o domínio oficial permite indexação e que os previews continuam bloqueados.

Nenhum deploy, merge, alteração de DNS ou recurso pago é realizado pelos scripts ou workflow deste repositório. Uma integração Vercel conectada futuramente deve ser revisada quanto aos gatilhos de publicação antes de sua ativação.

## Pendências para homologação e publicação

- Homologar visualmente o logotipo oficial já incorporado, incluindo header, rodapé e favicon.
- Confirmar o canal específico de privacidade. Os contatos comerciais já foram fornecidos e configurados.
- Identificação jurídica completa e validação de CNPJ/CRC; nenhum número é publicado. Responsável informada: Monica Freitas.
- Homologação visual e funcional do conteúdo aprovado para implementação.
- Validação jurídica final da minuta já aprovada para implementação, inclusive fornecedores e retenção.
- Homologação visual e funcional; publicação e domínio somente após autorização.

Não foram implementados portal, administração, autenticação, banco, APIs contábeis ou infraestrutura SaaS.

- [Arquitetura](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
- [Design system](docs/design-system.md)
- [Validação e capturas](docs/validation.md)

## Dados e conteúdo aprovados para implementação

A configuração pública em `src/lib/business.ts` usa WhatsApp **+55 16 99737-9559**, **contato@mdfreitas.com.br**, endereço **Rua Aquidaban, 1, Sala 2, Centro, São Carlos — SP**, responsável informada **Monica Freitas** e domínio **https://mdfreitas.com.br**. Quando as variáveis de canal não existem, esses contatos são os padrões do build. Definir explicitamente valor vazio desativa o canal correspondente, inclusive nos testes. Não há CNPJ, CRC ou credenciais profissionais presumidas.

A Home usa o título “Mais do que números. Estratégia para o seu crescimento.” e a mensagem “Estratégia, organização e confiança para o seu negócio.”. O portfólio definitivo contém sete serviços: Consultoria Empresarial, Gestão Financeira, Contabilidade, Departamento Pessoal, Departamento Fiscal, Abertura de Empresas e Regularização de Empresas. Os sete aparecem na Home, em Serviços, na navegação do rodapé e no formulário de contato. Abertura e Regularização têm páginas próprias com os títulos e descrições aprovados, sem promessas de aprovação, multas, economia garantida ou prazos fixos.

O PNG oficial foi recuperado da `main` no commit `5c601f5`, sem merge. Foi otimizado sem alterar os pixels RGBA (264.142 → 219.576 bytes). A variante de exibição reduz margens sem editar o desenho. O monograma foi extraído do original para favicon ICO 16/32/48 px e ícone PNG 256 px. Os componentes usam PNG sem recompressão com perdas e superfície clara de apoio para preservar cores e contraste. Consulte `public/branding/README.md` e `docs/validation.md`.
