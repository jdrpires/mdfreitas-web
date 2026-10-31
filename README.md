# M D’Freitas — Consultoria & Contabilidade

Site institucional em português brasileiro. Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4 e Lucide. Fontes Montserrat e Lato hospedadas localmente via Fontsource. Hospedagem prevista: Vercel; domínio previsto: `mdfreitas.com.br`.

## Desenvolvimento

Requer Node.js 22.13+ (recomendado: Node 24 LTS) e npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Acesse http://localhost:3000. Caso o cache padrão do npm não seja gravável, use `npm ci --cache /tmp/mdfreitas-npm-cache`.

```sh
npm run lint
npm run test
npm run build
npm run typecheck
npm run test:e2e
```

Os testes de navegador precisam de Chromium: `npx playwright install chromium`. O caminho pode ser definido por `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`; no ambiente desta entrega foi usado `/usr/bin/chromium`. O teste E2E inicia o servidor de produção, portanto rode o build primeiro. Os cenários de contato da configuração padrão pressupõem as variáveis de contato vazias.

## Configuração pública

Veja `.env.example`. Valores `NEXT_PUBLIC_*` fazem parte do bundle e nunca devem conter segredos. Alterações exigem novo build.

- `NEXT_PUBLIC_CONTACT_EMAIL`: e-mail real de atendimento.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número internacional real, somente dígitos.
- `NEXT_PUBLIC_LOGO_PATH`: caminho da imagem oficial em `public/branding/`, por exemplo `/branding/mdfreitas-logo.png`.

Nenhum telefone, endereço, registro ou e-mail foi inventado. Sem canais configurados, o formulário valida e baixa a solicitação em arquivo de texto; informa que nenhuma mensagem foi enviada. Com WhatsApp, prepara a mensagem nesse serviço; com apenas e-mail, abre o aplicativo por `mailto:`. O usuário precisa finalizar o envio no canal externo. Não há API de envio, banco ou armazenamento de leads nesta fase.

## Páginas

`/`, `/sobre`, `/servicos`, `/contabilidade-consultiva`, `/abertura-de-empresas`, `/conteudos`, `/contato`, `/politica-de-privacidade`, além de dois artigos em `/conteudos/[slug]`. Metadados por página, imagem Open Graph, sitemap, robots, página 404 e cabeçalhos básicos de segurança.

## Revisão antes da publicação

O site está preparado para revisão, não publicado. Incorporar o arquivo oficial do logotipo (disponível visualmente na conversa, ausente no executor), configurar contatos reais, confirmar informações institucionais e revisar a política com a identificação do responsável, canal de privacidade, hospedagem e retenção efetivos. O fallback do cabeçalho é o nome em texto, não uma recriação da marca. Não há dados de clientes, métricas inventadas ou depoimentos.

## Vercel

Após aprovação da revisão, importar o repositório na Vercel, selecionar Next.js, usar `npm run build` e cadastrar apenas as variáveis necessárias. Revisar a URL de preview antes de qualquer publicação de produção. Nenhuma infraestrutura, DNS ou publicação faz parte desta entrega.

- [Arquitetura](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
- [Design system](docs/design-system.md)
- [Validações e capturas](docs/validation.md)
