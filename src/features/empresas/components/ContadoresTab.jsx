import {
  T,
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

export default function ContadoresTab({ contadores, empresa }) {
  const contadoresDaEmpresa = contadores.filter((c) => c.empresasAtendidas.includes(empresa.codigo));

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Contadores</CardTitle>
        <CardDescription>Contador(es) habilitados a assinar demonstrativos de {empresa.nome}.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>CRC</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {contadoresDaEmpresa.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhum contador vinculado a esta empresa ainda.</td></tr>
            )}
            {contadoresDaEmpresa.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.nome}</TableCell>
                <TableCell>{c.cpf}</TableCell>
                <TableCell>{c.crc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
