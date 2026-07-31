import {
  T,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui";

export default function QuadroSocietarioCard({
  abrirAdicionarParticipacao,
  abrirEditarParticipacao,
  handleExcluirParticipacao,
  participacoesDaEmpresa,
}) {
  return (
    <Card className="gap-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sócios</CardTitle>
            <CardDescription>Participações vinculadas a esta empresa — referencia o registro unificado de sócios.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={abrirAdicionarParticipacao}>+ Adicionar sócio</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Sócio</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Tipo de sócio</TableHead>
              <TableHead>Participação</TableHead>
              <TableHead>Quotas integralizadas</TableHead>
              <TableHead>Data de entrada</TableHead>
              <TableHead>Data de saída</TableHead>
              <TableHead></TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {participacoesDaEmpresa.length === 0 && (
              <tr><td colSpan={9} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhum sócio vinculado a esta empresa ainda.</td></tr>
            )}
            {participacoesDaEmpresa.map(({ socio, ...part }) => (
              <TableRow key={socio.id}>
                <TableCell>{socio.nome}</TableCell>
                <TableCell>{socio.cpf}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span>{socio.telefone}</span>
                    <span className="text-xs" style={{ color: T.mutedForeground }}>{socio.email}</span>
                  </div>
                </TableCell>
                <TableCell>{part.tipoSocio || "—"}</TableCell>
                <TableCell>{part.percentual}%</TableCell>
                <TableCell>{part.quotasIntegralizadas}</TableCell>
                <TableCell>{part.dataEntrada || "—"}</TableCell>
                <TableCell>{part.dataSaida || "—"}</TableCell>
                <TableCell className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => abrirEditarParticipacao(socio, part)}
                    className="text-xs font-medium cursor-pointer hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
                    style={{ color: T.infoText }}
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExcluirParticipacao(socio)}
                    className="text-xs font-medium cursor-pointer hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
                    style={{ color: T.destructive }}
                  >
                    excluir
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
