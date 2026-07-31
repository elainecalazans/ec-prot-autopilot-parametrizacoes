import { T, CardContent } from "../../../components/ui";
import CampoDado from "./CampoDado";
import SecaoDados from "./SecaoDados";
import SituacaoBadge from "./SituacaoBadge";

export default function HistoricoEmpresa({ contadorVinculado, dadosGerais, setCadastroDetalheTab }) {
  return (
    <CardContent>
      <SecaoDados titulo="Relacionamento">
        <CampoDado
          label="Contador responsável"
          value={
            contadorVinculado ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span>{contadorVinculado.nome} — {contadorVinculado.crc}</span>
                <button
                  type="button"
                  onClick={() => setCadastroDetalheTab("contadores")}
                  className="text-xs font-medium cursor-pointer shrink-0 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
                  style={{ color: T.infoText }}
                >
                  Ver em Contadores →
                </button>
              </div>
            ) : "Nenhum contador vinculado ainda"
          }
        />
        <CampoDado label="Cliente desde" value={dadosGerais.clienteDesde} />
        <CampoDado
          label="Status do cliente"
          value={<SituacaoBadge empresa={{ dadosGerais }} />}
        />
        <CampoDado label="Início de atividade" value={dadosGerais.inicioAtividade} />
        {dadosGerais.statusCliente === "inativo" && (
          <CampoDado label="Data de inativação" value={dadosGerais.dataInativacao} />
        )}
        <CampoDado label="Duração do contrato" value={dadosGerais.duracaoContrato} />
      </SecaoDados>
    </CardContent>
  );
}
