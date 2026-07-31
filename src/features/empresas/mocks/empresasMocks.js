export const EMPRESAS = [
  {
    nome: "Padaria Aurora", codigo: "PA-0011", resp: "Elizandra Souza", optanteSimples: true,
    dadosGerais: {
      razaoSocial: "Padaria Aurora Ltda", nomeFantasia: "Padaria Aurora", tipoInscricao: "CNPJ",
      cnpj: "12.345.678/0001-90", ie: "10.111.222-3", im: "123456-7",
      logradouro: "Rua das Flores", numero: "120", complemento: "", bairro: "Setor Bueno",
      municipio: "Goiânia", uf: "GO", cep: "74.223-000",
      telefone: "(62) 3210-4455", email: "contato@padariaaurora.com.br",
      naturezaJuridica: "206-2 — Sociedade Empresária Limitada", regimeTributarioFederal: "Simples Nacional",
      inicioAtividade: "15/03/2015", statusCliente: "ativo", clienteDesde: "15/03/2015", dataInativacao: null,
      duracaoContrato: "Indeterminado", certificadoDigital: "Válido até 20/11/2026", observacoesGerais: "",
    },
    atividades: { cnaePrincipal: "1091-1/00", cnaeSecundarios: ["4721-1/02", "5611-2/01"] },
    modulosHabilitados: ["dp", "contabil"],
  },
  {
    nome: "Metalúrgica Sigma", codigo: "MS-0027", resp: "Wender Jonathan", optanteSimples: false,
    dadosGerais: {
      razaoSocial: "Metalúrgica Sigma Ltda", nomeFantasia: "Sigma Metais", tipoInscricao: "CNPJ",
      cnpj: "06.265.226/0001-09", ie: "10.234.567-8", im: "987654-3",
      logradouro: "Av. Industrial", numero: "850", complemento: "Galpão 3", bairro: "Distrito Industrial",
      municipio: "Goiânia", uf: "GO", cep: "74.675-000",
      telefone: "(62) 3299-7788", email: "contato@sigmametais.com.br",
      naturezaJuridica: "206-2 — Sociedade Empresária Limitada", regimeTributarioFederal: "Lucro Presumido",
      inicioAtividade: "02/06/2009", statusCliente: "ativo", clienteDesde: "02/06/2009", dataInativacao: null,
      duracaoContrato: "12 meses, renovação automática", certificadoDigital: "Válido até 08/04/2027", observacoesGerais: "Empresa com filiais — aguardando definição do campo Empresa Centralizadora.",
    },
    atividades: { cnaePrincipal: "2599-3/99", cnaeSecundarios: ["2542-0/00"] },
    modulosHabilitados: ["fiscal", "dp", "contabil"],
  },
  {
    nome: "Comércio Horizonte", codigo: "CH-0042", resp: "Andressa Lima", optanteSimples: true,
    dadosGerais: {
      razaoSocial: "Comércio Horizonte Ltda", nomeFantasia: "Horizonte", tipoInscricao: "CNPJ",
      cnpj: "22.333.444/0001-55", ie: "10.345.678-1", im: "456123-9",
      logradouro: "Rua T-30", numero: "540", complemento: "", bairro: "Setor Bueno",
      municipio: "Goiânia", uf: "GO", cep: "74.230-030",
      telefone: "(62) 3245-1122", email: "contato@horizontecomercio.com.br",
      naturezaJuridica: "206-2 — Sociedade Empresária Limitada", regimeTributarioFederal: "Simples Nacional",
      inicioAtividade: "22/09/2020", statusCliente: "inativo", clienteDesde: "22/09/2020", dataInativacao: "12/07/2026",
      duracaoContrato: "Indeterminado", certificadoDigital: "Expirado em 01/02/2026", observacoesGerais: "",
    },
    atividades: { cnaePrincipal: "4721-1/02", cnaeSecundarios: [] },
    modulosHabilitados: ["contabil"],
  },
  {
    nome: "Metalúrgica Sigma — Filial Anápolis", codigo: "MS-0027-F1", resp: "Wender Jonathan", optanteSimples: false,
    dadosGerais: {
      razaoSocial: "Metalúrgica Sigma Ltda — Filial Anápolis", nomeFantasia: "Sigma Metais Anápolis", tipoInscricao: "CNPJ",
      cnpj: "06.265.226/0002-80", ie: "10.234.568-6", im: "987655-1",
      logradouro: "Rod. BR-153", numero: "Km 12", complemento: "", bairro: "Distrito Agroindustrial",
      municipio: "Anápolis", uf: "GO", cep: "75.132-560",
      telefone: "(62) 3299-7790", email: "anapolis@sigmametais.com.br",
      naturezaJuridica: "206-2 — Sociedade Empresária Limitada", regimeTributarioFederal: "Lucro Presumido",
      inicioAtividade: "10/02/2018", statusCliente: "ativo", clienteDesde: "10/02/2018", dataInativacao: null,
      duracaoContrato: "12 meses, renovação automática", certificadoDigital: "Válido até 08/04/2027", observacoesGerais: "",
    },
    atividades: { cnaePrincipal: "2599-3/99", cnaeSecundarios: [] },
    modulosHabilitados: ["fiscal", "dp", "contabil"],
  },
  {
    nome: "Metalúrgica Sigma — Filial Trindade", codigo: "MS-0027-F2", resp: "Wender Jonathan", optanteSimples: false,
    dadosGerais: {
      razaoSocial: "Metalúrgica Sigma Ltda — Filial Trindade", nomeFantasia: "Sigma Metais Trindade", tipoInscricao: "CNPJ",
      cnpj: "06.265.226/0003-61", ie: "10.234.569-4", im: "987656-0",
      logradouro: "Av. Contorno", numero: "2200", complemento: "Sala 4", bairro: "Distrito Industrial II",
      municipio: "Trindade", uf: "GO", cep: "75.380-010",
      telefone: "(62) 3299-7791", email: "trindade@sigmametais.com.br",
      naturezaJuridica: "206-2 — Sociedade Empresária Limitada", regimeTributarioFederal: "Lucro Presumido",
      inicioAtividade: "05/09/2021", statusCliente: "ativo", clienteDesde: "05/09/2021", dataInativacao: null,
      duracaoContrato: "12 meses, renovação automática", certificadoDigital: "Válido até 08/04/2027", observacoesGerais: "",
    },
    atividades: { cnaePrincipal: "2599-3/99", cnaeSecundarios: [] },
    modulosHabilitados: ["fiscal", "dp", "contabil"],
  },
];

// Registro unificado de sócios (documento de pré-requisitos, 4.2) — um sócio pode
// participar de mais de uma empresa, por isso o cadastro é central e o Quadro
// Societário de cada empresa só referencia esse registro + % de participação.
export const SOCIOS_INICIAL = [
  {
    id: 1, nome: "Renato Zonzini Bocabello", cpf: "200.000.000-27",
    telefone: "(62) 99101-2233", email: "renato.bocabello@sigmametais.com.br",
    participacoes: [{ empresaCodigo: "MS-0027", percentual: 100, quotasIntegralizadas: 100, tipoSocio: "Administrador", dataEntrada: "02/06/2009", dataSaida: null }],
  },
  {
    id: 2, nome: "Elizandra Souza", cpf: "310.111.222-33",
    telefone: "(62) 99123-4455", email: "elizandra.souza@padariaaurora.com.br",
    participacoes: [{ empresaCodigo: "PA-0011", percentual: 60, quotasIntegralizadas: 60, tipoSocio: "Administrador", dataEntrada: "15/03/2015", dataSaida: null }],
  },
  {
    id: 3, nome: "Marcos Vinícius Souza", cpf: "410.222.333-44",
    telefone: "(62) 99876-5544", email: "marcos.souza@padariaaurora.com.br",
    participacoes: [{ empresaCodigo: "PA-0011", percentual: 40, quotasIntegralizadas: 40, tipoSocio: "Cotista", dataEntrada: "15/03/2015", dataSaida: null }],
  },
  {
    id: 4, nome: "Andressa Lima", cpf: "510.333.444-55",
    telefone: "(62) 99222-3311", email: "andressa.lima@horizontecomercio.com.br",
    participacoes: [{ empresaCodigo: "CH-0042", percentual: 100, quotasIntegralizadas: 100, tipoSocio: "Administrador", dataEntrada: "22/09/2020", dataSaida: null }],
  },
];

// Registro de contadores (documento de pré-requisitos, 4.1) — guia própria, só
// referenciada a partir da tela de Empresa (não precisa estar embutida nela).
export const CONTADORES_INICIAL = [
  { id: 1, nome: "Contador da Empresa Exemplo", cpf: "200.000.000-27", crc: "1SC123456/O-4", empresasAtendidas: ["MS-0027", "MS-0027-F1", "MS-0027-F2"] },
  { id: 2, nome: "Juliana Prado Contabilidade", cpf: "620.444.555-66", crc: "1GO987654/O-2", empresasAtendidas: ["PA-0011", "CH-0042"] },
];

// Empresa centralizadora — documento de pré-requisitos, 3.5: indica se a empresa é a
// centralizadora (matriz) das informações, usado só quando há matriz com filiais. Mapa
// separado do EMPRESAS (que é estático) pra permitir editar a centralização no protótipo
// sem precisar tornar todo o cadastro de empresas stateful.
export const CENTRALIZACAO_INICIAL = {
  "PA-0011": { tipo: "não se aplica", vinculoCodigo: null },
  "MS-0027": { tipo: "matriz", vinculoCodigo: null },
  "MS-0027-F1": { tipo: "filial", vinculoCodigo: "MS-0027" },
  "MS-0027-F2": { tipo: "filial", vinculoCodigo: "MS-0027" },
  "CH-0042": { tipo: "não se aplica", vinculoCodigo: null },
};
