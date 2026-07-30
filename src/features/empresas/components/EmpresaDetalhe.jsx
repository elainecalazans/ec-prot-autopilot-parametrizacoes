import { ChevronDown } from "lucide-react";
import {
  T,
  Tabs,
  TabsList,
  TabsTrigger,
} from "../../../components/ui";
import CentralizacaoCard from "./CentralizacaoCard";
import CnaesCard from "./CnaesCard";
import ContadoresTab from "./ContadoresTab";
import DadosGeraisCard from "./DadosGeraisCard";
import QuadroSocietarioCard from "./QuadroSocietarioCard";
import { findContadorDaEmpresa } from "../utils/contadores";

export default function EmpresaDetalhe({
  CENTRALIZACAO_OPCOES,
  EMPRESAS,
  abrirAdicionarParticipacao,
  abrirEditarParticipacao,
  cadastroDetalheTab,
  centralizacaoPorEmpresa,
  contadores,
  empresa,
  handleAlterarCentralizacao,
  handleExcluirParticipacao,
  participacoesDaEmpresa,
  setCadastroDetalheTab,
  setEmpresaCadastroSel,
}) {
  const contadorVinculado = findContadorDaEmpresa(contadores, empresa.codigo);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <button className="text-xs font-medium flex items-center gap-1 cursor-pointer" style={{ color: T.infoText }} onClick={() => setEmpresaCadastroSel(null)}>
          <ChevronDown className="size-3.5 rotate-90" /> voltar para a lista
        </button>
        {/* <Badge variant="outline">{empresa.codigo}</Badge> */}
      </div>

      <Tabs>
        <TabsList>
          <TabsTrigger active={cadastroDetalheTab === "geral"} onClick={() => setCadastroDetalheTab("geral")}>Dados gerais</TabsTrigger>
          <TabsTrigger active={cadastroDetalheTab === "atividades"} onClick={() => setCadastroDetalheTab("atividades")}>Atividades</TabsTrigger>
          <TabsTrigger active={cadastroDetalheTab === "societario"} onClick={() => setCadastroDetalheTab("societario")}>Sócios</TabsTrigger>
          <TabsTrigger active={cadastroDetalheTab === "contadores"} onClick={() => setCadastroDetalheTab("contadores")}>Contadores</TabsTrigger>
          <TabsTrigger active={cadastroDetalheTab === "centralizadora"} onClick={() => setCadastroDetalheTab("centralizadora")}>Empresa centralizadora</TabsTrigger>
        </TabsList>
      </Tabs>

      {cadastroDetalheTab === "geral" && (
        <DadosGeraisCard contadorVinculado={contadorVinculado} empresa={empresa} />
      )}

      {cadastroDetalheTab === "atividades" && (
        <CnaesCard empresa={empresa} />
      )}

      {cadastroDetalheTab === "societario" && (
        <QuadroSocietarioCard
          abrirAdicionarParticipacao={abrirAdicionarParticipacao}
          abrirEditarParticipacao={abrirEditarParticipacao}
          empresa={empresa}
          handleExcluirParticipacao={handleExcluirParticipacao}
          participacoesDaEmpresa={participacoesDaEmpresa}
        />
      )}

      {cadastroDetalheTab === "contadores" && (
        <ContadoresTab contadores={contadores} empresa={empresa} />
      )}

      {cadastroDetalheTab === "centralizadora" && (
        <CentralizacaoCard
          CENTRALIZACAO_OPCOES={CENTRALIZACAO_OPCOES}
          EMPRESAS={EMPRESAS}
          centralizacaoPorEmpresa={centralizacaoPorEmpresa}
          empresa={empresa}
          handleAlterarCentralizacao={handleAlterarCentralizacao}
        />
      )}
    </div>
  );
}
