import { useState } from "react";
import { CENTRALIZACAO_OPCOES, EMPRESAS_PAGE_SIZE, FILIAIS_PAGE_SIZE } from "../config/empresasConfig";
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
  const [filtroBusca, setFiltroBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todas");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [ordenarPor, setOrdenarPor] = useState("empresa");
  const [qtdVisivelEmpresas, setQtdVisivelEmpresas] = useState(EMPRESAS_PAGE_SIZE);
  const [socios, setSocios] = useState(SOCIOS_INICIAL);
  const [contadores] = useState(CONTADORES_INICIAL);
  const [centralizacaoPorEmpresa, setCentralizacaoPorEmpresa] = useState(CENTRALIZACAO_INICIAL);
  const [matrizesExpandidas, setMatrizesExpandidas] = useState(new Set());
  const [buscaFiliaisPorMatriz, setBuscaFiliaisPorMatriz] = useState({});
  const [qtdVisivelFiliaisPorMatriz, setQtdVisivelFiliaisPorMatriz] = useState({});
  const [qsSheetOpen, setQsSheetOpen] = useState(false);
  const [qsEditandoSocioId, setQsEditandoSocioId] = useState(null);
  const [qsForm, setQsForm] = useState({ socioId: "", percentual: "", quotasIntegralizadas: "", tipoSocio: "", dataEntrada: "", dataSaida: "" });

  // Muda a busca/filtro/ordenação e a paginação da listagem volta pra primeira
  // página — ajustado durante a renderização (padrão recomendado pelo React
  // para "resetar estado quando outro valor muda"), não em useEffect.
  const filtroChave = `${filtroBusca}|${filtroStatus}|${filtroTipo}|${ordenarPor}`;
  const [ultimoFiltroChave, setUltimoFiltroChave] = useState(filtroChave);
  if (filtroChave !== ultimoFiltroChave) {
    setUltimoFiltroChave(filtroChave);
    setQtdVisivelEmpresas(EMPRESAS_PAGE_SIZE);
  }

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

  function carregarMaisEmpresas() {
    setQtdVisivelEmpresas((q) => q + EMPRESAS_PAGE_SIZE);
  }

  function limparFiltros() {
    setFiltroBusca("");
    setFiltroStatus("todas");
    setFiltroTipo("todos");
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
    setQsForm({ socioId: "", percentual: "", quotasIntegralizadas: "", tipoSocio: "", dataEntrada: "", dataSaida: "" });
    setQsSheetOpen(true);
  }

  function abrirEditarParticipacao(socio, participacao) {
    setQsEditandoSocioId(socio.id);
    setQsForm({
      socioId: String(socio.id),
      percentual: String(participacao.percentual),
      quotasIntegralizadas: String(participacao.quotasIntegralizadas),
      tipoSocio: participacao.tipoSocio || "",
      dataEntrada: participacao.dataEntrada || "",
      dataSaida: participacao.dataSaida || "",
    });
    setQsSheetOpen(true);
  }

  function handleSalvarParticipacao() {
    if (!empresaCadastroSel || !qsForm.socioId) return;
    const percentual = Number(qsForm.percentual) || 0;
    const quotasIntegralizadas = Number(qsForm.quotasIntegralizadas) || 0;
    const tipoSocio = qsForm.tipoSocio || null;
    const dataEntrada = qsForm.dataEntrada || null;
    const dataSaida = qsForm.dataSaida || null;
    setSocios((prev) => prev.map((s) => {
      const participaDestaEmpresa = s.participacoes.some((p) => p.empresaCodigo === empresaCadastroSel);
      if (String(s.id) === qsForm.socioId) {
        const outras = s.participacoes.filter((p) => p.empresaCodigo !== empresaCadastroSel);
        return { ...s, participacoes: [...outras, { empresaCodigo: empresaCadastroSel, percentual, quotasIntegralizadas, tipoSocio, dataEntrada, dataSaida }] };
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
    carregarMaisEmpresas,
    carregarMaisFiliais,
    centralizacaoPorEmpresa,
    contadores,
    empresaCadastro,
    empresaCadastroSel,
    filtroBusca,
    filtroStatus,
    filtroTipo,
    handleAlterarCentralizacao,
    handleExcluirParticipacao,
    handleSalvarParticipacao,
    limparFiltros,
    matrizesExpandidas,
    ordenarPor,
    participacoesDaEmpresa,
    qtdVisivelEmpresas,
    qtdVisivelFiliaisPorMatriz,
    qsEditandoSocioId,
    qsForm,
    qsSheetOpen,
    setCadastroDetalheTab,
    setEmpresaCadastroSel,
    setFiltroBusca,
    setFiltroStatus,
    setFiltroTipo,
    setOrdenarPor,
    setQsForm,
    setQsSheetOpen,
    socios,
    toggleMatrizExpandida,
  };
}
