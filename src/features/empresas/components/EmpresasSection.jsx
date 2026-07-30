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
    carregarMaisFiliais,
    centralizacaoPorEmpresa,
    contadores,
    empresaCadastro,
    handleAlterarCentralizacao,
    handleExcluirParticipacao,
    matrizesExpandidas,
    participacoesDaEmpresa,
    qtdVisivelFiliaisPorMatriz,
    setCadastroDetalheTab,
    setEmpresaCadastroSel,
    toggleMatrizExpandida,
  } = props;

  return (
    <section className="flex flex-col gap-4">
      <EmpresasHeader />

      {!empresaCadastro && (
        <EmpresasList
          EMPRESAS={EMPRESAS}
          FILIAIS_PAGE_SIZE={FILIAIS_PAGE_SIZE}
          abrirCadastroEmpresa={abrirCadastroEmpresa}
          atualizarBuscaFilial={atualizarBuscaFilial}
          buscaFiliaisPorMatriz={buscaFiliaisPorMatriz}
          carregarMaisFiliais={carregarMaisFiliais}
          centralizacaoPorEmpresa={centralizacaoPorEmpresa}
          contadores={contadores}
          matrizesExpandidas={matrizesExpandidas}
          qtdVisivelFiliaisPorMatriz={qtdVisivelFiliaisPorMatriz}
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
