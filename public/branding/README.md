# Marca oficial

Fonte: arquivo `M D’FreITAS Luxury Consultancy Logo.png` enviado à main, commit `5c601f5`. Incorporado sem merge da main.

- `mdfreitas-logo.png`: master integral, 1774 × 887 px, RGBA e transparência real. Recompressão PNG sem perdas: 264.142 → 219.576 bytes; todos os pixels decodificados são iguais ao original.
- `mdfreitas-logo-display.png`: recorte de margens x=226, y=114, 1320 × 708 px. Não há redimensionamento nem alteração de cor neste arquivo. Pixels de opacidade quase nula nas margens externas ficam preservados no master.
- `src/app/favicon.ico` e `src/app/icon.png`: extração do monograma do mesmo arquivo, redimensionado proporcionalmente sobre fundo Paper; sem redesenho.

`Brand` usa a variante de exibição para o arquivo padrão. `NEXT_PUBLIC_LOGO_PATH` permanece opcional para outro arquivo local. PNG é servido sem compressão com perdas, com alt descritivo e object-fit contain. A superfície Paper do componente mantém a leitura da arte original também em contextos escuros; não há inversão da paleta. Fallback textual permanece apenas para arquivo/configuração ausente.

Conversões reproduzíveis com `node scripts/branding.mjs`, usando Sharp já presente com Next.js. Testes unitários protegem pixels do master, recorte e formatos dos ícones. Alterar o original exige revisão dos dados de auditoria e testes; não substituir por desenho similar.
