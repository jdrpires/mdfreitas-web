# Site institucional da M D’Freitas — revisão para homologação

Implementa o site institucional em Next.js com nove páginas e dois artigos, navegação responsiva e identidade premium. Esta revisão ajusta contato, privacidade, SEO, headers, testes e CI na mesma branch da PR #1.

Sem canais configurados, a seção de contato informa indisponibilidade, sem campos, download de TXT ou envio fictício. Com WhatsApp/e-mail, valida os dados, prepara os links e exige que o visitante conclua o envio no serviço escolhido. Inclui mensagem inicial no CTA do WhatsApp, validação das configurações e canal independente de privacidade.

Metadata individual, Open Graph, Twitter Cards e JSON-LD Organization contêm apenas informações verificadas. Previews são bloqueados por metatag, X-Robots-Tag e robots.txt. A produção só se torna indexável com aprovação explícita por configuração. CSP compatível com a geração estática restringe recursos a origens locais; a necessidade de unsafe-inline para a hidratação é documentada.

CI com Node 24, permissões mínimas, lint, geração de tipos, unitários, build, audit e matriz E2E para contato ausente, WhatsApp, e-mail e configuração oficial. Testes abrangem páginas, links e âncoras, três larguras, teclado, redução de movimento, SEO, segurança e acessibilidade automatizada.

Os contatos comerciais e dados informados de Monica Freitas foram incorporados. A Home usa os textos aprovados; o catálogo contém os sete serviços definitivos. Abertura de Empresas tem sua página própria restaurada e Regularização de Empresas recebe uma página específica, ambas com SEO, navegação e textos aprovados. A grade mantém equilíbrio em desktop, tablet e mobile. O PNG foi incorporado sem perda dos pixels; a versão de exibição e o favicon foram derivados do original sem redesenho. Pendências: identificação jurídica, canal específico de privacidade, homologação visual e validação jurídica final da política. Portal, painel, autenticação, banco e APIs permanecem fora do escopo. Nenhum merge, deploy, alteração de DNS ou recurso pago faz parte desta entrega. Evidências em `docs/validation.md` e `docs/previews/`.
