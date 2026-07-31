import { ArrowUpRight, ChevronDown } from "lucide-react";
import {
  T,
  Badge,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
} from "../../../components/ui";
import CentralizacaoCard from "./CentralizacaoCard";
import CnaesCard from "./CnaesCard";
import ContadoresTab from "./ContadoresTab";
import DadosGeraisCard from "./DadosGeraisCard";
import ModulosCard from "./ModulosCard";
import QuadroSocietarioCard from "./QuadroSocietarioCard";
import { abrirEmpresaNoCockpit } from "../utils/cockpit";
import { findContadorDaEmpresa } from "../utils/contadores";

const TIPO_BADGE = {
  matriz: { label: "Matriz", variant: "info" },
  filial: { label: "Filial", variant: "secondary" },
};

// TabsTrigger/TabsList (Design System) não repassam props extras nem têm
// role="tab"/aria-selected — são compartilhados com outras trilhas, então
// não são alterados aqui. Este wrapper adiciona hover e um anel de foco
// consistentes com o resto da feature "por fora", sem tocar no componente.
function AbaComEstados({ active, onClick, children }) {
  function aplicarHover(e, ligado) {
    if (active) return;
    const botao = e.currentTarget.querySelector("button");
    if (botao) botao.style.background = ligado ? "rgba(255, 255, 255, 0.7)" : "transparent";
  }

  function aplicarFoco(e, ligado) {
    if (ligado && !e.target.matches(":focus-visible")) return;
    const botao = e.currentTarget.querySelector("button");
    if (!botao) return;
    botao.style.outlineWidth = ligado ? "2px" : "";
    botao.style.outlineStyle = ligado ? "solid" : "";
    botao.style.outlineColor = ligado ? T.infoText : "";
    botao.style.outlineOffset = ligado ? "2px" : "";
  }

  return (
    <span
      onMouseEnter={(e) => aplicarHover(e, true)}
      onMouseLeave={(e) => aplicarHover(e, false)}
      onFocus={(e) => aplicarFoco(e, true)}
      onBlur={(e) => aplicarFoco(e, false)}
    >
      <TabsTrigger active={active} onClick={onClick}>{children}</TabsTrigger>
    </span>
  );
}

// Setas esquerda/direita movem o foco e já ativam a aba vizinha (padrão comum
// de segmented control) — implementado por delegação de evento no container,
// já que o TabsTrigger não expõe onKeyDown próprio.
function navegarAbasComSetas(e) {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  const botoes = [...e.currentTarget.querySelectorAll("button")];
  const indiceAtual = botoes.indexOf(document.activeElement);
  if (indiceAtual === -1) return;
  e.preventDefault();
  const proximo = e.key === "ArrowRight"
    ? botoes[(indiceAtual + 1) % botoes.length]
    : botoes[(indiceAtual - 1 + botoes.length) % botoes.length];
  proximo.focus();
  proximo.click();
}

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
  const tipoBadge = TIPO_BADGE[centralizacaoPorEmpresa[empresa.codigo]?.tipo];
  const mostrarAvisoLeitura = cadastroDetalheTab === "geral" || cadastroDetalheTab === "atividades";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <button className="text-xs font-medium flex items-center gap-1 cursor-pointer w-fit" style={{ color: T.infoText }} onClick={() => setEmpresaCadastroSel(null)}>
          <ChevronDown className="size-3.5 rotate-90" /> voltar para a lista
        </button>

        <div className="flex items-center justify-between gap-3 flex-wrap min-h-8">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold">{empresa.dadosGerais.razaoSocial}</h2>
            {tipoBadge && <Badge variant={tipoBadge.variant}>{tipoBadge.label}</Badge>}
            {mostrarAvisoLeitura && <Badge variant="outline">Somente leitura</Badge>}
          </div>

          {mostrarAvisoLeitura && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => abrirEmpresaNoCockpit(empresa)}
              onMouseEnter={(e) => (e.currentTarget.style.background = T.muted)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onFocus={(e) => {
                if (!e.target.matches(":focus-visible")) return;
                e.currentTarget.style.outlineWidth = "2px";
                e.currentTarget.style.outlineStyle = "solid";
                e.currentTarget.style.outlineColor = T.infoText;
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outlineWidth = "";
                e.currentTarget.style.outlineStyle = "";
                e.currentTarget.style.outlineColor = "";
                e.currentTarget.style.outlineOffset = "";
              }}
            >
              Editar no Cockpit
              <ArrowUpRight className="size-3.5" />
            </Button>
          )}
        </div>
      </div>

      <div onKeyDown={navegarAbasComSetas} className="w-fit">
        <Tabs>
          <TabsList>
            <AbaComEstados active={cadastroDetalheTab === "geral"} onClick={() => setCadastroDetalheTab("geral")}>Dados gerais</AbaComEstados>
            <AbaComEstados active={cadastroDetalheTab === "atividades"} onClick={() => setCadastroDetalheTab("atividades")}>Atividades</AbaComEstados>
            <AbaComEstados active={cadastroDetalheTab === "societario"} onClick={() => setCadastroDetalheTab("societario")}>Sócios</AbaComEstados>
            <AbaComEstados active={cadastroDetalheTab === "contadores"} onClick={() => setCadastroDetalheTab("contadores")}>Contadores</AbaComEstados>
            <AbaComEstados active={cadastroDetalheTab === "centralizadora"} onClick={() => setCadastroDetalheTab("centralizadora")}>Empresa centralizadora</AbaComEstados>
            <AbaComEstados active={cadastroDetalheTab === "modulos"} onClick={() => setCadastroDetalheTab("modulos")}>Módulos</AbaComEstados>
          </TabsList>
        </Tabs>
      </div>

      {cadastroDetalheTab === "geral" && (
        <DadosGeraisCard contadorVinculado={contadorVinculado} empresa={empresa} setCadastroDetalheTab={setCadastroDetalheTab} />
      )}

      {cadastroDetalheTab === "atividades" && (
        <CnaesCard empresa={empresa} />
      )}

      {cadastroDetalheTab === "societario" && (
        <QuadroSocietarioCard
          abrirAdicionarParticipacao={abrirAdicionarParticipacao}
          abrirEditarParticipacao={abrirEditarParticipacao}
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

      {cadastroDetalheTab === "modulos" && (
        <ModulosCard empresa={empresa} />
      )}
    </div>
  );
}
