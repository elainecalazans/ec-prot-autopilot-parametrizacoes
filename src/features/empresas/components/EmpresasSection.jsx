import EmpresaDetalhe from "./EmpresaDetalhe";
import EmpresasHeader from "./EmpresasHeader";
import EmpresasList from "./EmpresasList";

export default function EmpresasSection(props) {
  const {
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
    filtroBusca,
    filtroStatus,
    filtroTipo,
    handleAlterarCentralizacao,
    handleExcluirParticipacao,
    limparFiltros,
    matrizesExpandidas,
    ordenarPor,
    participacoesDaEmpresa,
    qtdVisivelEmpresas,
    qtdVisivelFiliaisPorMatriz,
    setCadastroDetalheTab,
    setEmpresaCadastroSel,
    setFiltroBusca,
    setFiltroStatus,
    setFiltroTipo,
    setOrdenarPor,
    toggleMatrizExpandida,
  } = props;

  return (
    <section className={`max-w-7xl ${empresaCadastro ? "flex flex-col gap-3" : "flex flex-col gap-4"}`}>
      <EmpresasHeader emCadastro={!!empresaCadastro} />

      {!empresaCadastro && (
        <EmpresasList
          EMPRESAS={EMPRESAS}
          FILIAIS_PAGE_SIZE={FILIAIS_PAGE_SIZE}
          abrirCadastroEmpresa={abrirCadastroEmpresa}
          atualizarBuscaFilial={atualizarBuscaFilial}
          buscaFiliaisPorMatriz={buscaFiliaisPorMatriz}
          carregarMaisEmpresas={carregarMaisEmpresas}
          carregarMaisFiliais={carregarMaisFiliais}
          centralizacaoPorEmpresa={centralizacaoPorEmpresa}
          contadores={contadores}
          filtroBusca={filtroBusca}
          filtroStatus={filtroStatus}
          filtroTipo={filtroTipo}
          limparFiltros={limparFiltros}
          matrizesExpandidas={matrizesExpandidas}
          ordenarPor={ordenarPor}
          qtdVisivelEmpresas={qtdVisivelEmpresas}
          qtdVisivelFiliaisPorMatriz={qtdVisivelFiliaisPorMatriz}
          setFiltroBusca={setFiltroBusca}
          setFiltroStatus={setFiltroStatus}
          setFiltroTipo={setFiltroTipo}
          setOrdenarPor={setOrdenarPor}
          toggleMatrizExpandida={toggleMatrizExpandida}
        />
      )}

      {empresaCadastro && (
        <EmpresaDetalhe
          CENTRALIZACAO_OPCOES={CENTRALIZACAO_OPCOES}
          EMPRESAS={EMPRESAS}
          abrirAdicionarParticipacao={abrirAdicionarParticipacao}
          abrirEditarParticipacao={abrirEditarParticipacao}
          cadastroDetalheTab={cadastroDetalheTab}
          centralizacaoPorEmpresa={centralizacaoPorEmpresa}
          contadores={contadores}
          empresa={empresaCadastro}
          handleAlterarCentralizacao={handleAlterarCentralizacao}
          handleExcluirParticipacao={handleExcluirParticipacao}
          participacoesDaEmpresa={participacoesDaEmpresa}
          setCadastroDetalheTab={setCadastroDetalheTab}
          setEmpresaCadastroSel={setEmpresaCadastroSel}
        />
      )}
    </section>
  );
}
