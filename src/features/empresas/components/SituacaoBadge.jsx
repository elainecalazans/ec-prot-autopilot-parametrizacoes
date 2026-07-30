import { Badge } from "../../../components/ui";

export default function SituacaoBadge({ empresa }) {
  const ativo = empresa.dadosGerais.statusCliente === "ativo";
  return <Badge variant={ativo ? "success" : "outline"}>{ativo ? "Ativa" : "Inativa"}</Badge>;
}
