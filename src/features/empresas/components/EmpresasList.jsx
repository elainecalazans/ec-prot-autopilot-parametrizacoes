import React from "react";
import { ChevronRight } from "lucide-react";
import {
  T,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui";
import { TABELA_EMPRESAS_LARGURAS as L } from "../config/empresasConfig";
import { findContadorDaEmpresa } from "../utils/contadores";
import FiliaisTable from "./FiliaisTable";
import SituacaoBadge from "./SituacaoBadge";

const CELL_COMPACTA = { paddingLeft: 12, paddingRight: 12 };
const CELL_ACAO = { paddingLeft: 8, paddingRight: 16 };

function EmpresaRow({ abrirCadastroEmpresa, codigo, children }) {
  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => abrirCadastroEmpresa(codigo)}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.muted)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </TableRow>
  );
}

export default function EmpresasList({
  EMPRESAS,
  FILIAIS_PAGE_SIZE,
  abrirCadastroEmpresa,
  atualizarBuscaFilial,
  buscaFiliaisPorMatriz,
  carregarMaisFiliais,
  centralizacaoPorEmpresa,
  contadores,
  matrizesExpandidas,
  qtdVisivelFiliaisPorMatriz,
  toggleMatrizExpandida,
}) {
  const matrizes = EMPRESAS.filter((e) => centralizacaoPorEmpresa[e.codigo]?.tipo === "matriz");
  const avulsas = EMPRESAS.filter((e) => {
    const t = centralizacaoPorEmpresa[e.codigo]?.tipo;
    return t !== "matriz" && t !== "filial";
  });
  function filiaisDe(matrizCodigo) {
    return EMPRESAS.filter((e) => centralizacaoPorEmpresa[e.codigo]?.vinculoCodigo === matrizCodigo);
  }

  return (
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
          <TableHead>Empresa</TableHead>
          <TableHead style={CELL_COMPACTA}>CNPJ</TableHead>
          <TableHead style={CELL_COMPACTA}>Contador responsável</TableHead>
          <TableHead style={CELL_COMPACTA}>Status</TableHead>
          <TableHead style={CELL_ACAO}></TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {matrizes.map((m) => {
          const filiais = filiaisDe(m.codigo);
          const expandida = matrizesExpandidas.has(m.codigo);
          const busca = buscaFiliaisPorMatriz[m.codigo] || "";
          const filiaisFiltradas = filiais.filter((f) => `${f.nome} ${f.codigo}`.toLowerCase().includes(busca.toLowerCase()));
          const qtdVisivel = qtdVisivelFiliaisPorMatriz[m.codigo] || FILIAIS_PAGE_SIZE;
          const filiaisVisiveis = filiaisFiltradas.slice(0, qtdVisivel);
          const contadorResp = findContadorDaEmpresa(contadores, m.codigo);
          return (
            <React.Fragment key={m.codigo}>
              <EmpresaRow abrirCadastroEmpresa={abrirCadastroEmpresa} codigo={m.codigo}>
                <TableCell style={CELL_COMPACTA}>{m.codigo}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleMatrizExpandida(m.codigo); }}
                      className="cursor-pointer shrink-0"
                      style={{ color: T.mutedForeground }}
                    >
                      <ChevronRight className="size-4 transition-transform" style={{ transform: expandida ? "rotate(90deg)" : "rotate(0deg)" }} />
                    </button>
                    <span className="text-sm font-medium truncate">{m.nome}</span>
                    <Badge variant="info" className="shrink-0">Matriz</Badge>
                    {filiais.length > 0 && (
                      <span className="text-xs shrink-0" style={{ color: T.mutedForeground }}>· {filiais.length} filial{filiais.length === 1 ? "" : "is"}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell style={CELL_COMPACTA}>{m.dadosGerais.cnpj}</TableCell>
                <TableCell style={CELL_COMPACTA} title={contadorResp?.nome}>
                  <span className="block truncate">{contadorResp?.nome || "—"}</span>
                </TableCell>
                <TableCell style={CELL_COMPACTA}><SituacaoBadge empresa={m} /></TableCell>
                <TableCell style={CELL_ACAO}><ChevronRight className="size-4" style={{ color: T.mutedForeground }} /></TableCell>
              </EmpresaRow>

              {expandida && (
                <tr>
                  <td colSpan={6} className="p-0">
                    <FiliaisTable
                      FILIAIS_PAGE_SIZE={FILIAIS_PAGE_SIZE}
                      abrirCadastroEmpresa={abrirCadastroEmpresa}
                      atualizarBuscaFilial={atualizarBuscaFilial}
                      busca={busca}
                      carregarMaisFiliais={carregarMaisFiliais}
                      contadores={contadores}
                      filiais={filiais}
                      filiaisFiltradas={filiaisFiltradas}
                      filiaisVisiveis={filiaisVisiveis}
                      matrizCodigo={m.codigo}
                      qtdVisivel={qtdVisivel}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}

        {avulsas.map((e) => {
          const contadorResp = findContadorDaEmpresa(contadores, e.codigo);
          return (
            <EmpresaRow key={e.codigo} abrirCadastroEmpresa={abrirCadastroEmpresa} codigo={e.codigo}>
              <TableCell style={CELL_COMPACTA}>{e.codigo}</TableCell>
              <TableCell><span className="text-sm font-medium truncate block">{e.nome}</span></TableCell>
              <TableCell style={CELL_COMPACTA}>{e.dadosGerais.cnpj}</TableCell>
              <TableCell style={CELL_COMPACTA} title={contadorResp?.nome}>
                <span className="block truncate">{contadorResp?.nome || "—"}</span>
              </TableCell>
              <TableCell style={CELL_COMPACTA}><SituacaoBadge empresa={e} /></TableCell>
              <TableCell style={CELL_ACAO}><ChevronRight className="size-4" style={{ color: T.mutedForeground }} /></TableCell>
            </EmpresaRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
