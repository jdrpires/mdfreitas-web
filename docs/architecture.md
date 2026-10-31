# Arquitetura

## Fase atual: site institucional

`src/app` contém rotas, layouts e metadados do App Router. As páginas institucionais são Server Components e são pré-renderizadas. Componentes de cliente são usados apenas para menu e formulário. `src/components` reúne identidade, navegação, cartões, chamadas e rodapé; `src/lib` concentra configuração pública, conteúdo e validação pura. `public/branding` recebe a imagem oficial.

A geração estática reduz a superfície operacional. Não existem autenticação, banco de dados, API de leads, uploads, cookies de analytics ou recursos pagos. As fontes são servidas localmente. O formulário processa os campos no navegador e prepara uma mensagem para envio voluntário pelo canal externo ou um arquivo local. Toda validação atual é de interface, pois não há endpoint. Qualquer endpoint futuro deve repetir validação no servidor.

O domínio canônico está em `src/lib/site.ts`. Metadata, Open Graph, sitemap e robots usam essa origem. URLs de preview precisam da proteção de indexação do ambiente Vercel. O header de segurança é centralizado em `next.config.ts`. CSP deve ser definida e testada quando scripts, serviços e nonces de produção forem conhecidos; não há alegação de proteção completa.

## Evolução planejada (não implementada)

- `mdfreitas.com.br`: presença institucional pública.
- `app.mdfreitas.com.br`: aplicação autenticada para clientes.
- `admin.mdfreitas.com.br`: operação interna com autorização independente.
- API independente: regras de negócio, PostgreSQL e armazenamento privado de documentos.

Manter fronteiras de autenticação e dados entre o site público e os produtos. A extração para monorepo só deve ocorrer quando os novos aplicativos existirem. Evitar abstrações de infraestrutura e dependências antecipadas.

Antes de qualquer módulo de cliente: modelar empresas e usuários, vínculo multiempresa, autorização no servidor e isolamento por tenant em todas as consultas; adotar testes de acesso cruzado. Prever revogação de sessões, privilégios mínimos, autenticação forte administrativa, trilhas de auditoria, backups testados e migrações versionadas.

Documentos exigirão armazenamento privado, URLs de curta duração, validação de tipo/tamanho, verificação de arquivos, retenção e eliminação. Segredos permanecerão no servidor ou em gerenciador próprio. Definir bases legais, operadores e atendimento aos direitos LGPD antes de coletar novos dados. Integrações e IA precisam de escopos limitados, rastreabilidade, análise de retenção por fornecedor e revisão humana em decisões contábeis.
