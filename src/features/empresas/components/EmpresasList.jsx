import React, { useMemo } from "react";
import { ChevronRight } from "lucide-react";
import {
  T,
  Badge,
  Button,
  Input,
  SelectField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  ToggleGroup,
  ToggleGroupItem,
} from "../../../components/ui";
import {
  ORDENACAO_OPCOES,
  STATUS_FILTRO_OPCOES,
  TABELA_EMPRESAS_LARGURAS as L,
  TABELA_EMPRESAS_LARGURA_MINIMA_NOME as EMPRESA_MIN,
  TABELA_EMPRESAS_PADDINGS as P,
  TIPO_FILTRO_OPCOES,
} from "../config/empresasConfig";
import { filtrarEOrdenarEmpresas } from "../services/empresasService";
import { findContadorDaEmpresa } from "../utils/contadores";
import FiliaisTable from "./FiliaisTable";
import IconeAcaoNavegar from "./IconeAcaoNavegar";
import LinhaEmpresaClicavel from "./LinhaEmpresaClicavel";
import SituacaoBadge from "./SituacaoBadge";

// Corta uma sequência de listas (na ordem em que aparecem na tela) até o total
// `qtd` de itens, sem quebrar nenhuma lista no meio de forma inconsistente —
// usado pra paginar a listagem sem misturar a ordem matriz > avulsas.
function paginarListas(qtd, ...listas) {
  let restante = qtd;
  return listas.map((lista) => {
    const fatia = lista.slice(0, Math.max(0, restante));
    restante -= fatia.length;
    return fatia;
  });
}

export default function EmpresasList({
  EMPRESAS,
  FILIAIS_PAGE_SIZE,
  abrirCadastroEmpresa,
  atualizarBuscaFilial,
  buscaFiliaisPorMatriz,
  carregarMaisEmpresas,
  carregarMaisFiliais,
  centralizacaoPorEmpresa,
  contadores,
  filtroBusca,
  filtroStatus,
  filtroTipo,
  limparFiltros,
  matrizesExpandidas,
  ordenarPor,
  qtdVisivelEmpresas,
  qtdVisivelFiliaisPorMatriz,
  setFiltroBusca,
  setFiltroStatus,
  setFiltroTipo,
  setOrdenarPor,
  toggleMatrizExpandida,
}) {
  const filtro = { busca: filtroBusca, status: filtroStatus, ordenarPor, contadores };

  const matrizesTodas = EMPRESAS.filter((e) => centralizacaoPorEmpresa[e.codigo]?.tipo === "matriz");
  const avulsasTodas = EMPRESAS.filter((e) => {
    const t = centralizacaoPorEmpresa[e.codigo]?.tipo;
    return t !== "matriz" && t !== "filial";
  });
  const filiaisTodas = EMPRESAS.filter((e) => centralizacaoPorEmpresa[e.codigo]?.tipo === "filial");

  // Agrupa as filiais por matriz uma única vez (O(n)) em vez de refiltrar o
  // array inteiro de EMPRESAS a cada matriz renderizada — importa quando a
  // base crescer para centenas de empresas.
  const filiaisPorMatriz = useMemo(() => {
    const mapa = new Map();
    EMPRESAS.forEach((e) => {
      const vinculo = centralizacaoPorEmpresa[e.codigo]?.vinculoCodigo;
      if (!vinculo) return;
      if (!mapa.has(vinculo)) mapa.set(vinculo, []);
      mapa.get(vinculo).push(e);
    });
    return mapa;
  }, [EMPRESAS, centralizacaoPorEmpresa]);

  function filiaisDe(matrizCodigo) {
    return filiaisPorMatriz.get(matrizCodigo) || [];
  }

  // Tipo=Filiais não tem representação hierárquica própria (filiais só existem
  // hoje aninhadas sob a matriz), então nesse filtro a lista mostra as filiais
  // soltas, sem expansão — as demais combinações mantêm a árvore matriz > filial
  // exatamente como antes, só filtrando/ordenando o que aparece em cada nível.
  const mostrarMatrizes = filtroTipo !== "filial";
  const mostrarAvulsas = filtroTipo === "todos";
  const mostrarFiliaisSoltas = filtroTipo === "filial";

  const matrizesFiltradas = mostrarMatrizes ? filtrarEOrdenarEmpresas(matrizesTodas, filtro) : [];
  const avulsasFiltradas = mostrarAvulsas ? filtrarEOrdenarEmpresas(avulsasTodas, filtro) : [];
  const filiaisFiltradas = mostrarFiliaisSoltas ? filtrarEOrdenarEmpresas(filiaisTodas, filtro) : [];

  const totalFiltrado = matrizesFiltradas.length + avulsasFiltradas.length + filiaisFiltradas.length;
  const [matrizesPaginadas, avulsasPaginadas, filiaisPaginadas] = paginarListas(
    qtdVisivelEmpresas, matrizesFiltradas, avulsasFiltradas, filiaisFiltradas,
  );
  const totalPaginado = matrizesPaginadas.length + avulsasPaginadas.length + filiaisPaginadas.length;
  const filtrosAtivos = filtroBusca.trim() !== "" || filtroStatus !== "todas" || filtroTipo !== "todos";

  // table-layout:fixed distribui o espaço extra pra coluna sem largura (Empresa)
  // quando o container é largo o bastante, mas não respeita min-width em th/td
  // pra impedir que ela colapse quando o container fica mais estreito que a
  // soma das colunas fixas. Dar essa largura mínima total ao <table> em si
  // (que aí sim respeita min-width como qualquer bloco) faz a tabela estourar
  // o container e rolar horizontalmente nesse caso, em vez de vazar conteúdo.
  const larguraMinimaTabela = Object.values(L).reduce((soma, largura) => soma + largura, 0) + EMPRESA_MIN;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Pesquisar</label>
            <Input
              placeholder="Pesquisar empresa, código ou CNPJ"
              value={filtroBusca}
              onChange={(ev) => setFiltroBusca(ev.target.value)}
              className="w-72"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Status</label>
            <ToggleGroup value={filtroStatus} onValueChange={setFiltroStatus}>
              {STATUS_FILTRO_OPCOES.map((o) => <ToggleGroupItem key={o.value} value={o.value}>{o.label}</ToggleGroupItem>)}
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Tipo</label>
            <ToggleGroup value={filtroTipo} onValueChange={setFiltroTipo}>
              {TIPO_FILTRO_OPCOES.map((o) => <ToggleGroupItem key={o.value} value={o.value}>{o.label}</ToggleGroupItem>)}
            </ToggleGroup>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Ordenar por</label>
          <SelectField value={ordenarPor} onChange={(ev) => setOrdenarPor(ev.target.value)} className="w-52">
            {ORDENACAO_OPCOES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </SelectField>
        </div>
      </div>

      <Table style={{ tableLayout: "fixed", minWidth: larguraMinimaTabela }}>
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
            <TableHead style={P.apertada}>Código</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead style={P.compacta}>CNPJ</TableHead>
            <TableHead style={P.compacta}>Contador responsável</TableHead>
            <TableHead style={P.apertada}>Status</TableHead>
            <TableHead style={P.acao}></TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {totalFiltrado === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>
                <div className="flex flex-col items-center gap-2">
                  <span>Nenhuma empresa encontrada para os filtros selecionados.</span>
                  {filtrosAtivos && (
                    <button
                      type="button"
                      onClick={limparFiltros}
                      className="text-xs font-medium cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
                      style={{ color: T.infoText }}
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>
              </td>
            </tr>
          )}

          {mostrarMatrizes && matrizesPaginadas.map((m) => {
            const filiais = filiaisDe(m.codigo);
            const expandida = matrizesExpandidas.has(m.codigo);
            const busca = buscaFiliaisPorMatriz[m.codigo] || "";
            const filiaisFiltradasPorBusca = filiais.filter((f) => `${f.nome} ${f.codigo}`.toLowerCase().includes(busca.toLowerCase()));
            const qtdVisivel = qtdVisivelFiliaisPorMatriz[m.codigo] || FILIAIS_PAGE_SIZE;
            const filiaisVisiveis = filiaisFiltradasPorBusca.slice(0, qtdVisivel);
            const contadorResp = findContadorDaEmpresa(contadores, m.codigo);
            const filiaisRegiaoId = `filiais-${m.codigo}`;
            return (
              <React.Fragment key={m.codigo}>
                <LinhaEmpresaClicavel abrirCadastroEmpresa={abrirCadastroEmpresa} codigo={m.codigo} nome={m.nome} expandida={expandida}>
                  <TableCell style={P.apertada}>{m.codigo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); toggleMatrizExpandida(m.codigo); }}
                        className="cursor-pointer shrink-0 rounded-full p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#2563eb]"
                        style={{ color: T.mutedForeground }}
                        aria-expanded={expandida}
                        aria-controls={filiaisRegiaoId}
                        aria-label={`${expandida ? "Recolher" : "Expandir"} filiais de ${m.nome}`}
                        onMouseEnter={(e) => (e.currentTarget.style.background = T.muted)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <ChevronRight className="size-4 transition-transform duration-200 ease-out" style={{ transform: expandida ? "rotate(90deg)" : "rotate(0deg)" }} />
                      </button>
                      <span className="text-sm font-medium truncate" title={m.nome}>{m.nome}</span>
                      <Badge variant="info" className="shrink-0">Matriz</Badge>
                      {filiais.length > 0 && (
                        <span className="text-xs shrink-0" style={{ color: T.mutedForeground }}>· {filiais.length} {filiais.length === 1 ? "filial" : "filiais"}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell style={P.compacta}>{m.dadosGerais.cnpj}</TableCell>
                  <TableCell style={P.compacta} title={contadorResp?.nome}>
                    <span className="block truncate">{contadorResp?.nome || "—"}</span>
                  </TableCell>
                  <TableCell style={P.apertada}><SituacaoBadge empresa={m} /></TableCell>
                  <TableCell style={P.acao}><IconeAcaoNavegar /></TableCell>
                </LinhaEmpresaClicavel>

                <tr>
                  <td colSpan={6} className="p-0">
                    <div
                      id={filiaisRegiaoId}
                      aria-hidden={!expandida}
                      inert={!expandida}
                      style={{ display: "grid", gridTemplateRows: expandida ? "1fr" : "0fr", transition: "grid-template-rows 200ms ease-in-out" }}
                    >
                      <div className="overflow-hidden" style={{ minHeight: 0 }}>
                        <FiliaisTable
                          FILIAIS_PAGE_SIZE={FILIAIS_PAGE_SIZE}
                          abrirCadastroEmpresa={abrirCadastroEmpresa}
                          atualizarBuscaFilial={atualizarBuscaFilial}
                          busca={busca}
                          carregarMaisFiliais={carregarMaisFiliais}
                          contadores={contadores}
                          filiais={filiais}
                          filiaisFiltradas={filiaisFiltradasPorBusca}
                          filiaisVisiveis={filiaisVisiveis}
                          matrizCodigo={m.codigo}
                          qtdVisivel={qtdVisivel}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}

          {mostrarAvulsas && avulsasPaginadas.map((e) => {
            const contadorResp = findContadorDaEmpresa(contadores, e.codigo);
            return (
              <LinhaEmpresaClicavel key={e.codigo} abrirCadastroEmpresa={abrirCadastroEmpresa} codigo={e.codigo} nome={e.nome}>
                <TableCell style={P.apertada}>{e.codigo}</TableCell>
                <TableCell><span className="text-sm font-medium truncate block" title={e.nome}>{e.nome}</span></TableCell>
                <TableCell style={P.compacta}>{e.dadosGerais.cnpj}</TableCell>
                <TableCell style={P.compacta} title={contadorResp?.nome}>
                  <span className="block truncate">{contadorResp?.nome || "—"}</span>
                </TableCell>
                <TableCell style={P.apertada}><SituacaoBadge empresa={e} /></TableCell>
                <TableCell style={P.acao}><IconeAcaoNavegar /></TableCell>
              </LinhaEmpresaClicavel>
            );
          })}

          {mostrarFiliaisSoltas && filiaisPaginadas.map((f) => {
            const contadorResp = findContadorDaEmpresa(contadores, f.codigo);
            return (
              <LinhaEmpresaClicavel key={f.codigo} abrirCadastroEmpresa={abrirCadastroEmpresa} codigo={f.codigo} nome={f.nome}>
                <TableCell style={P.apertada}>{f.codigo}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge variant="secondary" className="shrink-0">Filial</Badge>
                    <span className="text-sm font-medium truncate" title={f.nome}>{f.nome}</span>
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

      {totalFiltrado > totalPaginado && (
        <Button size="sm" variant="ghost" onClick={carregarMaisEmpresas} className="w-fit">
          Mostrar mais ({totalFiltrado - totalPaginado} restantes)
        </Button>
      )}
    </div>
  );
}
