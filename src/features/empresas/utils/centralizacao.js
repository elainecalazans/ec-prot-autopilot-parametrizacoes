export function centralizacaoTipoParaLabel(tipo) {
  if (tipo === "matriz") return "Centralizadora (Matriz)";
  if (tipo === "filial") return "Filial";
  return "Não se aplica";
}

export function centralizacaoLabelParaTipo(label) {
  if (label === "Centralizadora (Matriz)") return "matriz";
  if (label === "Filial") return "filial";
  return "não se aplica";
}