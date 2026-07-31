# Feature: Empresas

Tela inicial é exclusivamente a listagem de empresas. Sócios e Contadores não existem mais como telas independentes — vivem como tabs internas do cadastro de cada empresa, junto com dados gerais, atividades e empresa centralizadora.

## Estrutura

```
empresas/
├── EmpresasPage.jsx           # Entry point da feature (usado pelo router/menu)
├── index.js                   # Export público (EmpresasPage + EMPRESAS)
├── components/
│   ├── EmpresasSection.jsx    # Alterna entre listagem e cadastro de empresa conforme o estado
│   ├── EmpresasHeader.jsx     # Título e descrição da página
│   ├── EmpresasList.jsx       # Listagem de empresas (matrizes + avulsas), com filiais expansíveis
│   ├── FiliaisTable.jsx       # Sub-tabela de filiais de uma matriz (busca + paginação)
│   ├── EmpresaDetalhe.jsx     # Cadastro de uma empresa: tabs internas (geral/atividades/sócios/contadores/centralizadora/módulos)
│   ├── DadosGeraisCard.jsx    # Card "Dados gerais" (compõe os 3 blocos abaixo)
│   ├── DadosGeraisEmpresa.jsx # Blocos: identificação, inscrições, contato e localização (somente leitura)
│   ├── HistoricoEmpresa.jsx   # Bloco "Relacionamento": contador responsável, status do cliente, contrato
│   ├── CertificadoDigital.jsx # Bloco "Complementares": certificado digital e observações gerais
│   ├── CnaesCard.jsx          # Card "Atividades": CNAE principal e secundários (somente leitura)
│   ├── AvisoSomenteLeitura.jsx    # Aviso "Origem dos dados: Cockpit / Somente leitura", reutilizado nos cards espelhados
│   ├── QuadroSocietarioCard.jsx   # Tab "Sócios" do cadastro: participações societárias da empresa aberta
│   ├── QuadroSocietarioDrawer.jsx # Sheet de adicionar/editar participação societária
│   ├── ContadoresTab.jsx      # Tab "Contadores" do cadastro: contador(es) vinculados à empresa aberta (somente leitura)
│   ├── CentralizacaoCard.jsx  # Card "Empresa centralizadora": define relação matriz/filial
│   ├── ModulosCard.jsx        # Tab "Módulos" do cadastro: módulos do AutoPilot habilitados para a empresa aberta (somente leitura)
│   └── SituacaoBadge.jsx      # Badge Ativa/Inativa reutilizado nas listagens
├── hooks/
│   └── useEmpresas.js         # Todo o estado e as regras da feature (único hook de orquestração)
├── services/
│   └── empresasService.js     # Consultas sobre os dados de empresas (findByCodigo, options p/ select)
├── config/
│   └── empresasConfig.js      # Constantes (opções de centralização, tamanho de página das filiais)
├── utils/
│   └── centralizacao.js       # Conversão label <-> tipo para o campo de centralização
└── mocks/
    └── empresasMocks.js       # Dados mock: EMPRESAS, SOCIOS_INICIAL, CONTADORES_INICIAL, CENTRALIZACAO_INICIAL
```

## Arquitetura

- **`useEmpresas`** concentra todo o estado da feature (empresa aberta, tab interna do cadastro, filiais expandidas, formulário do drawer de sócios etc.) e as funções que alteram esse estado. `EmpresasPage` chama o hook uma vez e espalha (`{...empresas}`) o resultado para `EmpresasSection` e `QuadroSocietarioDrawer`.
- **`EmpresasSection`** não tem mais navegação por abas de nível superior: renderiza `EmpresasList` quando nenhuma empresa está aberta, ou `EmpresaDetalhe` quando `empresaCadastro` existe.
- Os **componentes de UI** não têm estado próprio relevante — recebem dados e callbacks via props e apenas renderizam. Isso mantém a lógica de negócio centralizada no hook e os componentes fáceis de testar/reaproveitar.
- **`services/empresasService.js`** isola consultas sobre a lista de empresas (hoje mock, futuramente API) para que o hook e os componentes não acessem `EMPRESAS` diretamente para esse fim.
- **`utils/centralizacao.js`** converte entre o rótulo exibido no `SelectField` ("Centralizadora (Matriz)", "Filial", "Não se aplica") e o tipo interno (`matriz` | `filial` | `não se aplica`).
- **`mocks/empresasMocks.js`** é a fonte de dados do protótipo. `EMPRESAS` é estático; `CENTRALIZACAO_INICIAL` é um mapa separado por código de empresa para permitir editar a centralização sem tornar todo o cadastro de empresas stateful.

## Conceitos de domínio

- **Dados gerais e Atividades (CNAEs)**: somente leitura aqui — o texto de UI deixa claro que a edição acontece no Cockpit/Contexto.
- **Sócios**: tab interna do cadastro da empresa (`QuadroSocietarioCard` + `QuadroSocietarioDrawer`). Cada empresa referencia o registro unificado de sócios (estado `socios` no hook) através de `participacoes` (percentual + quotas integralizadas). Um sócio pode participar de várias empresas, mas a gestão de vínculo é feita sempre a partir do cadastro da empresa.
- **Contadores**: tab interna do cadastro da empresa (`ContadoresTab`), somente leitura — mostra os contadores cujo `empresasAtendidas` inclui o código da empresa aberta. O registro de contadores em si (`contadores` no hook) não tem UI própria de criação/edição nesta feature.
- **Empresa centralizadora**: relação matriz/filial usada futuramente para consolidação contábil. Guardada em `centralizacaoPorEmpresa`, chaveada por código da empresa (`tipo` + `vinculoCodigo` da matriz quando `tipo === "filial"`).
- **Módulos**: tab interna do cadastro da empresa (`ModulosCard`), somente leitura — mostra o catálogo fixo de módulos do AutoPilot (`MODULOS_DISPONIVEIS` em `config/empresasConfig.js`: Fiscal, DP, Contábil) e indica quais estão habilitados para a empresa aberta via `empresa.modulosHabilitados` (array de `key`).

## Convenções

- Import de UI compartilhada sempre via `../../../components/ui` (Design System) — não recriar componentes visuais dentro da feature.
- Novos componentes vão em `components/`; novas regras de negócio ficam em `hooks/`, `services/` ou `utils/` conforme o tipo (estado de tela, consulta de dados, transformação pura).
- Nomes e mensagens de UI em português, seguindo o padrão já usado na feature.
