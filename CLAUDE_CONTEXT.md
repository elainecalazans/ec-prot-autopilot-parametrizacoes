# Contexto arquitetural

O projeto deve evoluir por trilhas independentes: Empresas, Contabil, Fiscal, DP e Regras Gerais.

## Organizacao

- `src/features/<trilha>` contem o codigo especifico da trilha.
- Cada feature deve ter `components`, `hooks`, `services`, `config`, `mocks` e `utils`.
- `src/components/ui` contem primitives reutilizaveis do Design System portado.
- `src/components/shared` contem componentes compostos usados por mais de uma trilha.
- `src/config/<trilha>` contem enums, badges, opcoes e configuracoes declarativas de dominio.
- `src/mocks/<trilha>` contem dados mockados da trilha.
- `src/utils` e `src/constants` sao apenas para codigo verdadeiramente compartilhado.

## Convencoes

- Uma feature nao deve importar codigo de outra feature.
- Codigo especifico fica dentro da propria trilha.
- Codigo compartilhado deve subir para `components/shared`, `components/ui`, `utils`, `config` ou `constants`.
- Novas regras de negocio devem ser adicionadas na feature da trilha correspondente.
- Novos mocks devem ser adicionados em `src/features/<trilha>/mocks` ou `src/mocks/<trilha>`, conforme o escopo.
- Novas configuracoes declarativas da trilha devem ficar em `src/features/<trilha>/config` ou `src/config/<trilha>`.

## Estado atual

A tela funcional existente esta em `src/features/regras-gerais/RegrasGeraisPage.jsx`. As pastas das demais trilhas existem como estrutura para permitir desenvolvimento incremental por issue sem carregar todo o projeto.
