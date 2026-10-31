# Design system

## Identidade

Referência prioritária: logotipo apresentado pelo usuário. A imagem não foi materializada no executor; o componente `Brand` está preparado para recebê-la por configuração. Enquanto ausente, exibe apenas identificação textual. Os arcos decorativos do hero são uma composição editorial abstrata, não um logotipo ou representação de métricas.

## Tokens

| Token     | Cor       | Uso                                         |
| --------- | --------- | ------------------------------------------- |
| Forest    | `#10291F` | Texto, botões, seções institucionais        |
| Champagne | `#C3AA93` | Detalhes em superfícies escuras             |
| Taupe     | `#755B47` | Destaques e pequenos títulos em fundo claro |
| Linen     | `#F2EBE5` | Superfícies e textos em fundo escuro        |
| Gold      | `#A78868` | Linhas, indicadores e foco                  |
| Paper     | `#FCFAF7` | Fundo principal                             |

Montserrat 400/500/600 nos títulos e destaques; Lato 400/700 nos textos e controles. Fontes locais via pacotes Fontsource, sem chamadas ao Google Fonts. Espaçamento generoso, bordas discretas, cantos retos e CTA com ícone de direção.

## Componentes e comportamento

`Header`, `Brand`, `Footer`, `PageIntro`, `ContactButton`, `ContactStrip`, `ServiceGrid` e `ContactForm` compõem as páginas. Conteúdo e destinos dos serviços são centralizados em `src/lib/site.ts`.

Breakpoints de 1100, 800 e 580 px, grades progressivas e menu móvel com `aria-expanded`, fechamento ao navegar e Escape. Link para pular ao conteúdo, labels visíveis, validação nativa e complementar, mensagens em regiões de status, foco visível e redução de movimento. Cores discretas de texto devem preservar contraste; a revisão de acessibilidade não equivale a certificação.

Fotografias não foram incluídas, evitando dependências externas e imagens que sugerissem equipe ou escritório reais. O logotipo deve ser incluído com `next/image`, proporção preservada e revisão de contraste em fundos claros.

## Revisão para homologação

Paleta e fontes preservadas. O arquivo padrão é `public/branding/mdfreitas-logo.png`, detectado no servidor quando disponível. Um caminho opcional pode ser configurado; apenas arquivos locais com extensões de imagem permitidas são aceitos. Se ausente, mantém-se a identificação textual. `next/image` preserva proporção, com object-fit contain, limites de tamanho para desktop e celular e texto alternativo. Resolução e contraste da imagem oficial permanecem pendentes de verificação enquanto o arquivo não for entregue.

A seção de contato sem canais não possui campos nem ação de download. Com canais válidos, o formulário prepara links identificados de WhatsApp e e-mail e informa que não houve envio automático. A preparação é descartada ao editar os campos para evitar mensagens desatualizadas. A política apresenta aviso explícito de revisão pendente.

O menu móvel retorna o foco ao botão quando fechado por Escape. Os testes verificam 390, 768 e 1440 px, foco de teclado, ausência de overflow e prefers-reduced-motion. As verificações automatizadas de acessibilidade cobrem desktop e celular; a avaliação com tecnologias assistivas e com o logotipo real continua parte da homologação humana.
