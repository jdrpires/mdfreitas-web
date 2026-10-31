# Design system

## Identidade

Referência prioritária: logotipo apresentado pelo usuário. O PNG oficial foi recuperado do arquivo enviado à main e incorporado com transparência preservada. O componente `Brand` usa uma variante de margens reduzidas, mantendo o original integral; existe fallback textual apenas para configuração indisponível. Os arcos decorativos do hero são uma composição editorial abstrata, não um logotipo ou representação de métricas.

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

Paleta e fontes preservadas. O arquivo padrão é `public/branding/mdfreitas-logo.png`, detectado no servidor quando disponível. Um caminho opcional pode ser configurado; apenas arquivos locais com extensões de imagem permitidas são aceitos. O arquivo integral tem 1774 × 887 px, com transparência real. Uma variante de 1320 × 708 px é exibida em 220 px no desktop e 190 px no mobile. `next/image` usa PNG sem conversão com perdas, proporção preservada, object-fit contain, texto alternativo e fundo Paper de apoio. O header reserva 136 px no desktop e 120 px no mobile para acomodar a marca empilhada.

A seção de contato sem canais não possui campos nem ação de download. Com canais válidos, o formulário prepara links identificados de WhatsApp e e-mail e informa que não houve envio automático. A preparação é descartada ao editar os campos para evitar mensagens desatualizadas. A política apresenta aviso explícito de revisão pendente.

O menu móvel retorna o foco ao botão quando fechado por Escape. Os testes verificam 390, 768 e 1440 px, foco de teclado, ausência de overflow e prefers-reduced-motion. As verificações automatizadas de acessibilidade cobrem desktop e celular; a avaliação com tecnologias assistivas continua parte da homologação humana.

## Conteúdo aprovado e serviços

Título principal: “Mais do que números. Estratégia para o seu crescimento.”. Apoio: “Estratégia, organização e confiança para o seu negócio.”. Catálogo definitivo com sete serviços. Desktop: grade de seis colunas de base, com três cartões na primeira linha e dois em cada uma das duas seguintes. Tablet: duas colunas, com o último cartão ocupando a linha completa. Mobile: uma coluna. Os dois últimos cartões remetem às páginas próprias de Abertura e Regularização de Empresas. Endereço e responsável aparecem no Contato; o endereço também consta no rodapé. O atendimento continua consultivo, sem histórias ou credenciais inventadas.

O PNG oficial foi obtido a partir do link enviado para o arquivo na main. A imagem integral mantém exatamente os pixels RGBA do original e foi reduzida em aproximadamente 17% por recompressão sem perdas. A variante de exibição é um recorte exato (x=226, y=114, largura=1320, altura=708), sem alteração dos pixels. O original tem alguns pixels de opacidade muito baixa nas margens; eles permanecem no arquivo integral. O recorte de monograma (x=574, y=114, largura=636, altura=388) é redimensionado com proporção preservada sobre Paper para os ícones. Não há desenho novo, inversão ou alteração da paleta.
