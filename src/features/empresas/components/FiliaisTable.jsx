import { ChevronRight } from "lucide-react";
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
  TableRow,
} from "../../../components/ui";
import { TABELA_EMPRESAS_LARGURAS as L } from "../config/empresasConfig";
import { findContadorDaEmpresa } from "../utils/contadores";
import SituacaoBadge from "./SituacaoBadge";

const CELL_COMPACTA = { paddingLeft: 12, paddingRight: 12 };
const CELL_ACAO = { paddingLeft: 8, paddingRight: 16 };

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
  return (
    <div className="flex flex-col gap-3 px-6 py-4" style={{ background: T.muted, borderBottom: `1px solid ${T.border}` }}>
      {filiais.length > FILIAIS_PAGE_SIZE && (
        <Input
          placeholder="Buscar filial por nome ou código..."
          value={busca}
          onChange={(ev) => atualizarBuscaFilial(matrizCodigo, ev.target.value)}
          className="w-72"
        />
      )}
      <Table style={{ tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: L.codigo }} />
          <col />
          <col style={{ width: L.cnpj }} />
          <col style={{ width: L.contadorResponsavel }} />
          <col style={{ width: L.status }} />
          <col style={{ width: L.acao }} />
        </colgroup>
        <TableHeader>
          <tr>
            <TableHead style={CELL_COMPACTA}>Código</TableHead>
            <TableHead>Filial</TableHead>
            <TableHead style={CELL_COMPACTA}>CNPJ</TableHead>
            <TableHead style={CELL_COMPACTA}>Contador responsável</TableHead>
            <TableHead style={CELL_COMPACTA}>Status</TableHead>
            <TableHead style={CELL_ACAO}></TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {filiaisVisiveis.length === 0 && (
            <tr><td colSpan={6} className="px-6 py-6 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhuma filial encontrada.</td></tr>
          )}
          {filiaisVisiveis.map((f) => {
            const contadorResp = findContadorDaEmpresa(contadores, f.codigo);
            return (
              <TableRow
                key={f.codigo}
                className="cursor-pointer"
                onClick={() => abrirCadastroEmpresa(f.codigo)}
                onMouseEnter={(e) => (e.currentTarget.style.background = T.muted)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <TableCell style={CELL_COMPACTA}>{f.codigo}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge variant="secondary" className="shrink-0">Filial</Badge>
                    <span className="text-sm truncate">{f.nome}</span>
                  </div>
                </TableCell>
                <TableCell style={CELL_COMPACTA}>{f.dadosGerais.cnpj}</TableCell>
                <TableCell style={CELL_COMPACTA} title={contadorResp?.nome}>
                  <span className="block truncate">{contadorResp?.nome || "—"}</span>
                </TableCell>
                <TableCell style={CELL_COMPACTA}><SituacaoBadge empresa={f} /></TableCell>
                <TableCell style={CELL_ACAO}><ChevronRight className="size-4" style={{ color: T.mutedForeground }} /></TableCell>
              </TableRow>
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
