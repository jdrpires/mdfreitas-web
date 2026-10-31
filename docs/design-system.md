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
