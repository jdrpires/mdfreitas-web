# feat: site institucional da M D’Freitas

O repositório continha apenas o README inicial. Esta alteração cria o site institucional em Next.js com oito páginas, dois artigos, navegação responsiva, componentes reutilizáveis e a identidade de cores e tipografia indicada no briefing.

O formulário valida os campos e prepara a solicitação no WhatsApp ou aplicativo de e-mail quando configurados. Sem canais configurados, permite baixar o texto e informa explicitamente que não houve envio. Nenhum dado empresarial, credencial ou resultado foi inventado.

Inclui metadados por página, Open Graph, sitemap, robots, fontes locais, cabeçalhos básicos de segurança e documentação da evolução futura para os portais de cliente e administração. Os módulos futuros não estão implementados.

O arquivo oficial do logotipo precisa ser adicionado em `public/branding/` e habilitado por `NEXT_PUBLIC_LOGO_PATH`; até lá, a identificação é textual. Configurar os canais reais e completar a revisão jurídica antes da publicação. Não há deploy, alteração de DNS ou recursos pagos.

Validação: lint, TypeScript, testes unitários de formulário, build de produção e testes em Chromium de rotas, metadados, menu móvel, layout sem overflow, download do contato e checagem automática de acessibilidade. Capturas para revisão em `docs/previews/`.
