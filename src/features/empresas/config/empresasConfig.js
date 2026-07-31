export const CENTRALIZACAO_OPCOES = ["Centralizadora (Matriz)", "Filial", "Não se aplica"];
export const TIPO_SOCIO_OPCOES = ["Administrador", "Cotista"];

// Catálogo de módulos do AutoPilot (documento de pré-requisitos, 3.6) — cada
// empresa habilita um subconjunto via `modulosHabilitados` (array de `key`).
export const MODULOS_DISPONIVEIS = [
  { key: "fiscal", label: "Fiscal" },
  { key: "dp", label: "DP" },
  { key: "contabil", label: "Contábil" },
];
export const FILIAIS_PAGE_SIZE = 6;

// Quantidade de linhas (matrizes + avulsas, ou filiais soltas no filtro Tipo)
// mostradas de uma vez na listagem principal antes do "Mostrar mais" — evita
// renderizar centenas de linhas de uma vez quando a base de empresas crescer.
export const EMPRESAS_PAGE_SIZE = 25;

// Opções da barra de filtros/ordenação da listagem de empresas. Os `value`
// são o vocabulário estável que vai para o estado (e, futuramente, para os
// query params de uma API) — os `label` são só o texto exibido.
export const STATUS_FILTRO_OPCOES = [
  { value: "todas", label: "Todas" },
  { value: "ativo", label: "Ativas" },
  { value: "inativo", label: "Inativas" },
];

export const TIPO_FILTRO_OPCOES = [
  { value: "todos", label: "Todas" },
  { value: "matriz", label: "Matrizes" },
  { value: "filial", label: "Filiais" },
];

export const ORDENACAO_OPCOES = [
  { value: "empresa", label: "Empresa" },
  { value: "codigo", label: "Código" },
  { value: "cnpj", label: "CNPJ" },
  { value: "responsavel", label: "Contador responsável" },
];

// Larguras fixas (px) das colunas da listagem de empresas e da tabela de filiais —
// compartilhadas entre as duas tabelas (elementos <table> independentes) para
// garantir alinhamento visual entre linhas de matriz e de filial. Empresa e
// Contador responsável não têm largura fixa: dividem o espaço restante da
// tabela (ver <col> sem width em EmpresasList/FiliaisTable), então o nome do
// contador aparece completo com mais frequência.
export const TABELA_EMPRESAS_LARGURAS = {
  codigo: 104,
  cnpj: 170,
  contadorResponsavel: 280,
  status: 90,
  acao: 40,
};

// Largura mínima da coluna flexível (Empresa/Filial). Sem isso, em janelas
// mais estreitas que a soma das colunas fixas, o navegador colapsa essa
// coluna pra 0px e o conteúdo (chevron + nome + badge) vaza visualmente por
// cima das colunas vizinhas — abaixo desse mínimo a tabela passa a rolar
// horizontalmente (comportamento padrão do Table), em vez de corromper o layout.
export const TABELA_EMPRESAS_LARGURA_MINIMA_NOME = 220;

// Paddings horizontais por coluna — mesmos valores usados no cabeçalho e nas
// células de dado, nas duas tabelas, para manter tudo alinhado.
export const TABELA_EMPRESAS_PADDINGS = {
  apertada: { paddingLeft: 8, paddingRight: 8 },
  compacta: { paddingLeft: 12, paddingRight: 12 },
  acao: { paddingLeft: 8, paddingRight: 16 },
};
