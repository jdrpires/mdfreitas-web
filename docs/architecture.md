# Arquitetura do site institucional

## Estrutura atual

`src/app` contém as rotas e metadados do App Router. As páginas são Server Components pré-renderizados. Menu e formulário são os únicos componentes com interação no cliente. `src/components` contém elementos compartilhados; `src/lib` reúne configuração, dados comerciais aprovados em `business.ts`, conteúdo e funções puras de validação e construção de links. `public/branding` contém a imagem oficial integral e a variante de exibição.

Não há portal, painel, autenticação, banco, APIs, upload ou infraestrutura SaaS. Não foram criados schemas, clientes de banco ou dependências para funções futuras. O projeto pode ser hospedado na Vercel como aplicação Next.js convencional.

## Fluxo de contato

`channels.ts` valida e-mails e números internacionais e codifica a mensagem como parâmetro de URL. Configuração inválida não habilita o canal. Sem variável de ambiente, os dados comerciais fornecidos são os padrões; uma variável explicitamente vazia desativa o canal. `contact.ts` verifica os campos e produz texto simples. O React escapa o texto do visitante; ele não é usado em HTML executável.

Sem canal disponível, o componente mostra uma mensagem de indisponibilidade, sem coletar dados. Com canal, mantém os campos em memória até a navegação e prepara links para o visitante abrir. Não há gravação em storage ou cookies pelo código da aplicação, nem chamada de API de envio. A abertura de WhatsApp ou aplicativo de e-mail compartilha o conteúdo com esse serviço; o envio final é realizado pelo usuário. O canal de privacidade é configurado independentemente.

## SEO e ambientes

A URL canônica é `https://mdfreitas.com.br`. Cada página tem título, descrição, Open Graph e Twitter. A imagem de compartilhamento é gerada localmente em `/opengraph-image`. O JSON-LD Organization usa apenas nome e URL verificados.

`deployment.ts` permite indexação somente com `VERCEL_ENV=production` e `SITE_INDEXABLE=true`. HTML, robots.txt e headers usam essa regra no build. Previews permanecem bloqueados mesmo com a flag verdadeira; produção aprovada remove os bloqueios. É necessário rebuild após mudar a configuração. A proteção dos endereços alternativos da própria Vercel também deve ser conferida na hospedagem, sem presumir comportamento de um domínio ainda não publicado.

## Segurança

Headers definidos em `next.config.ts`: nosniff, política de referrer, bloqueio de frames, permissões de dispositivo e CSP. Recursos são locais: scripts, estilos, fontes e imagens não dependem de hosts de terceiros. Links externos abertos em nova aba usam `noopener noreferrer`.

A CSP restringe origens a self, bloqueia objetos e frames, limita base e destinos de formulários. `unsafe-eval` existe apenas em desenvolvimento para compatibilidade do tooling. `unsafe-inline` para scripts e estilos é mantido nesta arquitetura estática, pois o Next.js usa scripts de hidratação embutidos e estilos inline. Isso limita a proteção contra injeção inline; não se trata de uma CSP estrita. Adotar nonces exigiria reavaliar a renderização estática e não foi antecipado sem necessidade. A compatibilidade da política foi verificada com páginas e interações reais nos testes.

Variáveis públicas não contêm segredos. Nenhuma credencial de produção é necessária. Testes usam contatos reservados e nunca fazem navegação para os serviços externos. A auditoria de dependências e a busca por padrões conhecidos de credenciais ajudam na revisão, mas não constituem garantia absoluta.

## Verificação e CI

`npm run typecheck` gera tipos de rotas antes da checagem, inclusive em clones limpos. Testes unitários cobrem validação, encoding e política de indexação. E2E executam builds independentes sem contato, com WhatsApp, com e-mail e com os dados oficiais padrão, incluindo os estados de preview e produção aprovada. As verificações cobrem links, metadados, acessibilidade, responsividade e comportamento do formulário.

A CI tem jobs de qualidade e matriz E2E, Node 24, cache npm e permissões mínimas. Não há job de deploy. A evolução para qualquer plataforma futura depende de nova definição de escopo e não integra esta arquitetura.

## Serviços e compatibilidade de endereços

Os sete nomes definitivos são centralizados em `business.ts` e usados pelo catálogo e pela validação do formulário. Abertura de Empresas volta a ser uma página própria com resposta 200, sem redirecionamento. Regularização de Empresas tem rota específica. As duas integram a navegação, o sitemap, os cartões e os assuntos do formulário. Os textos e descrições específicos são centralizados em `companyServices`, sem novas dependências. Nome da responsável e endereço são apresentados apenas conforme os dados recebidos, sem inferir formação, tempo de atuação, CNPJ ou CRC.

## Recursos de marca

`Brand` é um Server Component que verifica arquivos locais antes de renderizar. O PNG oficial integral permanece sem alterações visuais; a variante de exibição elimina margens com ruído de baixíssima opacidade sem modificar pixels do desenho. O componente usa `next/image` com `unoptimized` para servir PNG sem recompressão com perdas, dimensões reservadas e fundo claro de apoio. O mesmo recurso é reutilizado no header e no rodapé.

`src/app/favicon.ico` e `src/app/icon.png` são derivados do recorte do monograma, sem redesenho. `scripts/branding.mjs` reproduz as conversões com Sharp, já presente como dependência do Next.js; não adiciona serviço ou dependência nova. Testes conferem o hash dos pixels do master, igualdade do recorte e formatos dos ícones.
