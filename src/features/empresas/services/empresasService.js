import { EMPRESAS } from "../mocks/empresasMocks";

export function findEmpresaByCodigo(codigo) {
  return EMPRESAS.find((empresa) => empresa.codigo === codigo);
}

export function getEmpresasOptions() {
  return EMPRESAS.map((empresa) => ({ value: empresa.codigo, label: empresa.nome, sublabel: empresa.codigo }));
}