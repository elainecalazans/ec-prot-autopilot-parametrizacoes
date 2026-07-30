import { useState } from "react";
import { CENTRALIZACAO_OPCOES, FILIAIS_PAGE_SIZE } from "../config/empresasConfig";
import {
  CENTRALIZACAO_INICIAL,
  CONTADORES_INICIAL,
  EMPRESAS,
  SOCIOS_INICIAL,
} from "../mocks/empresasMocks";
import { findEmpresaByCodigo } from "../services/empresasService";
import { centralizacaoLabelParaTipo } from "../utils/centralizacao";

export function useEmpresas() {
  const [empresaCadastroSel, setEmpresaCadastroSel] = useState(null);
  const [cadastroDetalheTab, setCadastroDetalheTab] = useState("geral");
  const [socios, setSocios] = useState(SOCIOS_INICIAL);
  const [contadores] = useState(CONTADORES_INICIAL);
  const [centralizacaoPorEmpresa, setCentralizacaoPorEmpresa] = useState(CENTRALIZACAO_INICIAL);
  const [matrizesExpandidas, setMatrizesExpandidas] = useState(new Set());
  const [buscaFiliaisPorMatriz, setBuscaFiliaisPorMatriz] = useState({});
  const [qtdVisivelFiliaisPorMatriz, setQtdVisivelFiliaisPorMatriz] = useState({});
  const [qsSheetOpen, setQsSheetOpen] = useState(false);
  const [qsEditandoSocioId, setQsEditandoSocioId] = useState(null);
  const [qsForm, setQsForm] = useState({ socioId: "", percentual: "", quotasIntegralizadas: "" });

  const empresaCadastro = empresaCadastroSel ? findEmpresaByCodigo(empresaCadastroSel) : null;
  const participacoesDaEmpresa = empresaCadastroSel
    ? socios.flatMap((s) => s.participacoes.filter((p) => p.empresaCodigo === empresaCadastroSel).map((p) => ({ socio: s, ...p })))
    : [];

  function toggleMatrizExpandida(codigo) {
    setMatrizesExpandidas((prev) => {
      const next = new Set(prev);
      if (next.has(codigo)) next.delete(codigo); else next.add(codigo);
      return next;
    });
  }

  function atualizarBuscaFilial(matrizCodigo, valor) {
    setBuscaFiliaisPorMatriz((prev) => ({ ...prev, [matrizCodigo]: valor }));
    setQtdVisivelFiliaisPorMatriz((prev) => ({ ...prev, [matrizCodigo]: FILIAIS_PAGE_SIZE }));
  }

  function carregarMaisFiliais(matrizCodigo) {
    setQtdVisivelFiliaisPorMatriz((prev) => ({ ...prev, [matrizCodigo]: (prev[matrizCodigo] || FILIAIS_PAGE_SIZE) + FILIAIS_PAGE_SIZE }));
  }

  function abrirCadastroEmpresa(codigo) {
    setEmpresaCadastroSel(codigo);
    setCadastroDetalheTab("geral");
  }

  function handleAlterarCentralizacao(codigoEmpresa, novoLabel, matrizAncora) {
    const novoTipo = centralizacaoLabelParaTipo(novoLabel);
    setCentralizacaoPorEmpresa((prev) => ({
      ...prev,
      [codigoEmpresa]: {
        tipo: novoTipo,
        vinculoCodigo: novoTipo === "filial" ? matrizAncora : null,
      },
    }));
  }

  function abrirAdicionarParticipacao() {
    setQsEditandoSocioId(null);
    setQsForm({ socioId: "", percentual: "", quotasIntegralizadas: "" });
    setQsSheetOpen(true);
  }

  function abrirEditarParticipacao(socio, participacao) {
    setQsEditandoSocioId(socio.id);
    setQsForm({ socioId: String(socio.id), percentual: String(participacao.percentual), quotasIntegralizadas: String(participacao.quotasIntegralizadas) });
    setQsSheetOpen(true);
  }

  function handleSalvarParticipacao() {
    if (!empresaCadastroSel || !qsForm.socioId) return;
    const percentual = Number(qsForm.percentual) || 0;
    const quotasIntegralizadas = Number(qsForm.quotasIntegralizadas) || 0;
    setSocios((prev) => prev.map((s) => {
      const participaDestaEmpresa = s.participacoes.some((p) => p.empresaCodigo === empresaCadastroSel);
      if (String(s.id) === qsForm.socioId) {
        const outras = s.participacoes.filter((p) => p.empresaCodigo !== empresaCadastroSel);
        return { ...s, participacoes: [...outras, { empresaCodigo: empresaCadastroSel, percentual, quotasIntegralizadas }] };
      }
      if (qsEditandoSocioId && s.id === qsEditandoSocioId && participaDestaEmpresa) {
        return { ...s, participacoes: s.participacoes.filter((p) => p.empresaCodigo !== empresaCadastroSel) };
      }
      return s;
    }));
    setQsSheetOpen(false);
  }

  function handleExcluirParticipacao(socio) {
    setSocios((prev) => prev.map((s) => s.id !== socio.id ? s : { ...s, participacoes: s.participacoes.filter((p) => p.empresaCodigo !== empresaCadastroSel) }));
  }

  return {
    CENTRALIZACAO_OPCOES,
    EMPRESAS,
    FILIAIS_PAGE_SIZE,
    abrirAdicionarParticipacao,
    abrirCadastroEmpresa,
    abrirEditarParticipacao,
    atualizarBuscaFilial,
    buscaFiliaisPorMatriz,
    cadastroDetalheTab,
    carregarMaisFiliais,
    centralizacaoPorEmpresa,
    contadores,
    empresaCadastro,
    empresaCadastroSel,
    handleAlterarCentralizacao,
    handleExcluirParticipacao,
    handleSalvarParticipacao,
    matrizesExpandidas,
    participacoesDaEmpresa,
    qtdVisivelFiliaisPorMatriz,
    qsEditandoSocioId,
    qsForm,
    qsSheetOpen,
    setCadastroDetalheTab,
    setEmpresaCadastroSel,
    setQsForm,
    setQsSheetOpen,
    socios,
    toggleMatrizExpandida,
  };
}
