import {
  T,
  Badge,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "../../../components/ui";
import {
  TABELA_EMPRESAS_LARGURAS as L,
  TABELA_EMPRESAS_LARGURA_MINIMA_NOME as EMPRESA_MIN,
  TABELA_EMPRESAS_PADDINGS as P,
} from "../config/empresasConfig";
import { findContadorDaEmpresa } from "../utils/contadores";
import IconeAcaoNavegar from "./IconeAcaoNavegar";
import LinhaEmpresaClicavel from "./LinhaEmpresaClicavel";
import SituacaoBadge from "./SituacaoBadge";

const SUBHEADER_BASE = { height: 30, paddingTop: 0, paddingBottom: 0, fontSize: 11, fontWeight: 500, color: T.mutedForeground };

export default function FiliaisTable({
  FILIAIS_PAGE_SIZE,
  abrirCadastroEmpresa,
  atualizarBuscaFilial,
  busca,
  carregarMaisFiliais,
  contadores,
  filiais,
  filiaisFiltradas,
  filiaisVisiveis,
  matrizCodigo,
  qtdVisivel,
}) {
  const larguraMinimaTabela = Object.values(L).reduce((soma, largura) => soma + largura, 0) + EMPRESA_MIN;

  return (
    <div className="flex flex-col gap-2 pl-10 py-3" style={{ background: T.muted }}>
      {filiais.length > FILIAIS_PAGE_SIZE && (
        <Input
          placeholder="Buscar filial por nome ou código..."
          value={busca}
          onChange={(ev) => atualizarBuscaFilial(matrizCodigo, ev.target.value)}
          className="w-72"
        />
      )}
      <Table style={{ tableLayout: "fixed", minWidth: larguraMinimaTabela }}>
        <colgroup>
          <col style={{ width: L.codigo }} />
          <col />
          <col style={{ width: L.cnpj }} />
          <col style={{ width: L.contadorResponsavel }} />
          <col style={{ width: L.status }} />
          <col style={{ width: L.acao }} />
        </colgroup>
        <TableHeader style={{ background: T.card }}>
          <tr>
            <TableHead style={{ ...SUBHEADER_BASE, ...P.apertada }}>Código</TableHead>
            <TableHead style={SUBHEADER_BASE}>Filial</TableHead>
            <TableHead style={{ ...SUBHEADER_BASE, ...P.compacta }}>CNPJ</TableHead>
            <TableHead style={{ ...SUBHEADER_BASE, ...P.compacta }}>Contador responsável</TableHead>
            <TableHead style={{ ...SUBHEADER_BASE, ...P.apertada }}>Status</TableHead>
            <TableHead style={{ ...SUBHEADER_BASE, ...P.acao }}></TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {filiaisVisiveis.length === 0 && (
            <tr><td colSpan={6} className="px-6 py-5 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhuma filial encontrada.</td></tr>
          )}
          {filiaisVisiveis.map((f) => {
            const contadorResp = findContadorDaEmpresa(contadores, f.codigo);
            return (
              <LinhaEmpresaClicavel key={f.codigo} abrirCadastroEmpresa={abrirCadastroEmpresa} codigo={f.codigo} nome={f.nome}>
                <TableCell style={P.apertada}>{f.codigo}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge variant="secondary" className="shrink-0">Filial</Badge>
                    <span className="text-sm truncate" title={f.nome}>{f.nome}</span>
                  </div>
                </TableCell>
                <TableCell style={P.compacta}>{f.dadosGerais.cnpj}</TableCell>
                <TableCell style={P.compacta} title={contadorResp?.nome}>
                  <span className="block truncate">{contadorResp?.nome || "—"}</span>
                </TableCell>
                <TableCell style={P.apertada}><SituacaoBadge empresa={f} /></TableCell>
                <TableCell style={P.acao}><IconeAcaoNavegar /></TableCell>
              </LinhaEmpresaClicavel>
            );
          })}
        </TableBody>
      </Table>
      {filiaisFiltradas.length > qtdVisivel && (
        <Button size="sm" variant="ghost" onClick={() => carregarMaisFiliais(matrizCodigo)} className="w-fit">
          Mostrar mais ({filiaisFiltradas.length - qtdVisivel} restantes)
        </Button>
      )}
    </div>
  );
}
