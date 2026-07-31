import { Info } from "lucide-react";
import {
  T,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  SelectField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui";
import { TABELA_EMPRESAS_PADDINGS as P } from "../config/empresasConfig";
import { centralizacaoTipoParaLabel } from "../utils/centralizacao";
import SituacaoBadge from "./SituacaoBadge";

export default function CentralizacaoCard({
  CENTRALIZACAO_OPCOES,
  EMPRESAS,
  centralizacaoPorEmpresa,
  empresa,
  handleAlterarCentralizacao,
}) {
  const infoAtual = centralizacaoPorEmpresa[empresa.codigo] || { tipo: "não se aplica", vinculoCodigo: null };
  const matrizCodigo = infoAtual.tipo === "matriz" ? empresa.codigo : infoAtual.vinculoCodigo;
  const grupo = matrizCodigo
    ? EMPRESAS.filter((e) => e.codigo === matrizCodigo || centralizacaoPorEmpresa[e.codigo]?.vinculoCodigo === matrizCodigo)
    : [empresa];

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>Empresa centralizadora</CardTitle>
        <CardDescription>
          {infoAtual.tipo === "não se aplica"
            ? "Esta empresa não tem relação de matriz/filial cadastrada."
            : `Grupo de ${EMPRESAS.find((e) => e.codigo === matrizCodigo)?.nome} — indica qual empresa recebe as informações consolidadas das filiais.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <tr>
              <TableHead style={P.apertada}>Código</TableHead>
              <TableHead>Razão social</TableHead>
              <TableHead style={P.compacta}>Tipo de inscrição</TableHead>
              <TableHead style={P.compacta}>Inscrição</TableHead>
              <TableHead style={P.apertada}>Status</TableHead>
              <TableHead>Centralização</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {grupo.map((e) => {
              const info = centralizacaoPorEmpresa[e.codigo] || { tipo: "não se aplica" };
              return (
                <TableRow key={e.codigo} style={e.codigo === empresa.codigo ? { background: T.accent } : {}}>
                  <TableCell style={P.apertada}>{e.codigo}</TableCell>
                  <TableCell>{e.dadosGerais.razaoSocial}</TableCell>
                  <TableCell style={P.compacta}>{e.dadosGerais.tipoInscricao}</TableCell>
                  <TableCell style={P.compacta}>{e.dadosGerais.cnpj}</TableCell>
                  <TableCell style={P.apertada}><SituacaoBadge empresa={e} /></TableCell>
                  <TableCell>
                    <SelectField
                      value={centralizacaoTipoParaLabel(info.tipo)}
                      onChange={(ev) => handleAlterarCentralizacao(e.codigo, ev.target.value, matrizCodigo || e.codigo)}
                      className="w-52"
                    >
                      {CENTRALIZACAO_OPCOES.map((o) => <option key={o}>{o}</option>)}
                    </SelectField>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Info className="size-3.5 shrink-0" style={{ color: T.mutedForeground }} />
        <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Campo de extrema importância futura.</b> Hoje não há empresas com matriz/filial fora deste grupo de exemplo, mas a definição de qual empresa centraliza as informações impacta diretamente a consolidação contábil.</span>
      </CardFooter>
    </Card>
  );
}
