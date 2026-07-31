import { EMPRESAS } from "../mocks/empresasMocks";
import { findContadorDaEmpresa } from "../utils/contadores";

export function findEmpresaByCodigo(codigo) {
  return EMPRESAS.find((empresa) => empresa.codigo === codigo);
}

export function getEmpresasOptions() {
  return EMPRESAS.map((empresa) => ({ value: empresa.codigo, label: empresa.nome, sublabel: empresa.codigo }));
}

export function empresaCorrespondeABusca(empresa, busca) {
  const termo = busca.trim().toLowerCase();
  if (!termo) return true;
  return (
    empresa.nome.toLowerCase().includes(termo) ||
    empresa.codigo.toLowerCase().includes(termo) ||
    empresa.dadosGerais.cnpj.toLowerCase().includes(termo)
  );
}

export function empresaCorrespondeAoStatus(empresa, status) {
  return status === "todas" || empresa.dadosGerais.statusCliente === status;
}

function valorParaOrdenacao(empresa, ordenarPor, contadores) {
  switch (ordenarPor) {
    case "codigo": return empresa.codigo;
    case "cnpj": return empresa.dadosGerais.cnpj;
    case "responsavel": return findContadorDaEmpresa(contadores, empresa.codigo)?.nome || "";
    case "empresa":
    default: return empresa.nome;
  }
}

export function compararEmpresas(a, b, ordenarPor, contadores) {
  return valorParaOrdenacao(a, ordenarPor, contadores).localeCompare(
    valorParaOrdenacao(b, ordenarPor, contadores),
    "pt-BR",
    { sensitivity: "base" },
  );
}

// Filtra por busca (nome/código/CNPJ) + status, e ordena o resultado. Hoje
// roda em memória sobre o array mockado; a assinatura (lista + filtro plano)
// já é o formato que uma futura chamada de API (ex.: GET /empresas?busca=...
// &status=...&ordenarPor=...) poderia receber como query params, então trocar
// a origem dos dados não deve exigir mudar quem chama esta função.
export function filtrarEOrdenarEmpresas(empresas, { busca = "", status = "todas", ordenarPor = "empresa", contadores = [] }) {
  return empresas
    .filter((empresa) => empresaCorrespondeABusca(empresa, busca) && empresaCorrespondeAoStatus(empresa, status))
    .sort((a, b) => compararEmpresas(a, b, ordenarPor, contadores));
}
