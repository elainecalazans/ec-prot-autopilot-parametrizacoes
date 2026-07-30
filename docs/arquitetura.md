# Arquitetura por trilhas

Este projeto esta organizado para que cada trilha de negocio possa evoluir com o minimo de contexto externo.

## Estrutura

- `src/features/empresas`: cadastro e parametros relacionados a empresas.
- `src/features/contabil`: regras e parametros da trilha Contabil.
- `src/features/fiscal`: regras e parametros da trilha Fiscal.
- `src/features/dp`: regras e parametros da trilha DP.
- `src/features/regras-gerais`: regras transversais e a pagina atual do prototipo.
- `src/components/ui`: componentes base reutilizaveis, como `Button`, `Card`, `Badge`, `Table`, `Dialog`, `Sheet`, `Tabs`, `Select` e `Toast`.
- `src/components/shared`: componentes compostos compartilhados por mais de uma feature.
- `src/config`: configuracoes declarativas compartilhadas ou separadas por dominio.
- `src/constants`: constantes realmente globais.
- `src/mocks`: dados mockados separados por dominio.
- `src/utils`: utilitarios compartilhados entre trilhas.

## Convencao de feature

Cada feature deve seguir o mesmo formato:

```text
features/<trilha>/
  <Trilha>Page.jsx
  components/
  hooks/
  services/
  config/
  mocks/
  utils/
```

Codigo especifico de uma trilha deve ficar dentro da propria feature. Uma feature nao deve importar outra feature diretamente.

## Como adicionar uma nova trilha

1. Crie `src/features/<nova-trilha>`.
2. Adicione a pagina de entrada `<NovaTrilha>Page.jsx`.
3. Crie as pastas `components`, `hooks`, `services`, `config`, `mocks` e `utils`.
4. Coloque regras de negocio, mocks e configuracoes dentro da feature quando forem exclusivos dela.
5. Promova apenas componentes ou utilitarios realmente compartilhados para `src/components/shared`, `src/components/ui`, `src/utils`, `src/config` ou `src/constants`.

## Estado atual

A aplicacao preserva a experiencia existente em `src/features/regras-gerais/RegrasGeraisPage.jsx`. As demais trilhas ja possuem estrutura e pontos de entrada para futuras issues, mantendo a base preparada para migracoes incrementais sem alterar layout, textos, navegacao ou regras de negocio.
