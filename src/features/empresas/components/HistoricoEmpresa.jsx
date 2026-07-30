import { Badge, CardContent } from "../../../components/ui";
import CampoDado from "./CampoDado";
import SecaoDados from "./SecaoDados";

export default function HistoricoEmpresa({ contadorVinculado, dadosGerais }) {
  return (
    <CardContent>
      <SecaoDados titulo="Relacionamento">
        <CampoDado
          label="Contador responsável"
          value={contadorVinculado ? `${contadorVinculado.nome} — ${contadorVinculado.crc}` : "Nenhum contador vinculado ainda"}
        />
        <CampoDado
          label="Status do cliente"
          value={<Badge variant={dadosGerais.statusCliente === "ativo" ? "success" : "outline"} className="w-fit">{dadosGerais.statusCliente}</Badge>}
        />
        <CampoDado label="Cliente desde" value={dadosGerais.clienteDesde} />
        <CampoDado label="Início de atividade" value={dadosGerais.inicioAtividade} />
        {dadosGerais.statusCliente === "inativo" && (
          <CampoDado label="Data de inativação" value={dadosGerais.dataInativacao} />
        )}
        <CampoDado label="Duração do contrato" value={dadosGerais.duracaoContrato} />
      </SecaoDados>
    </CardContent>
  );
}
