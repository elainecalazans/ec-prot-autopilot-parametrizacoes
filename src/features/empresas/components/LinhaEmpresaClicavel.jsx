import { T, TableRow } from "../../../components/ui";

// Linha de tabela clicável (matriz, avulsa ou filial) que abre o cadastro da
// empresa. Compartilhada entre EmpresasList e FiliaisTable para garantir o
// mesmo comportamento de hover/foco/teclado nas duas tabelas.
export default function LinhaEmpresaClicavel({ abrirCadastroEmpresa, codigo, nome, expandida = false, children }) {
  const backgroundRepouso = expandida ? T.infoSubtle : "transparent";

  function irParaCadastro() {
    abrirCadastroEmpresa(codigo);
  }

  return (
    <TableRow
      role="button"
      tabIndex={0}
      aria-label={`Abrir cadastro de ${nome}`}
      className="group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2563eb]"
      style={{ background: backgroundRepouso }}
      onClick={irParaCadastro}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          irParaCadastro();
        }
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.muted)}
      onMouseLeave={(e) => (e.currentTarget.style.background = backgroundRepouso)}
      onFocus={(e) => (e.currentTarget.style.background = T.muted)}
      onBlur={(e) => (e.currentTarget.style.background = backgroundRepouso)}
    >
      {children}
    </TableRow>
  );
}
