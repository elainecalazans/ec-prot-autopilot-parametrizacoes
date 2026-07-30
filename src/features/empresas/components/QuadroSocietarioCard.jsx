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
  empresa,
  handleExcluirParticipacao,
  participacoesDaEmpresa,
}) {
  return (
    <Card className="gap-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Quadro societário</CardTitle>
            <CardDescription>Sócios vinculados a {empresa.nome}, com % de participação — referencia o registro unificado de Sócios.</CardDescription>
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
              <TableHead>Participação</TableHead>
              <TableHead>Quotas integralizadas</TableHead>
              <TableHead></TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {participacoesDaEmpresa.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhum sócio vinculado a esta empresa ainda.</td></tr>
            )}
            {participacoesDaEmpresa.map(({ socio, ...part }) => (
              <TableRow key={socio.id}>
                <TableCell>{socio.nome}</TableCell>
                <TableCell>{socio.cpf}</TableCell>
                <TableCell>{part.percentual}%</TableCell>
                <TableCell>{part.quotasIntegralizadas}</TableCell>
                <TableCell className="flex gap-3">
                  <span onClick={() => abrirEditarParticipacao(socio, part)} className="text-xs font-medium cursor-pointer" style={{ color: T.infoText }}>editar</span>
                  <span onClick={() => handleExcluirParticipacao(socio)} className="text-xs font-medium cursor-pointer" style={{ color: T.destructive }}>excluir</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
