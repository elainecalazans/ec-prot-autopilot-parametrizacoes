import {
  T,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui";

export default function CnaesCard({ empresa }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Atividades</CardTitle>
          <Badge variant="secondary">leitura · cockpit</Badge>
        </div>
        <CardDescription>CNAE principal e secundários — preenchimento obrigatório no Cockpit.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px]" style={{ color: T.mutedForeground }}>CNAE principal</span>
          <span className="text-sm">{empresa.atividades.cnaePrincipal}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px]" style={{ color: T.mutedForeground }}>CNAEs secundários</span>
          <span className="text-sm">{empresa.atividades.cnaeSecundarios.length > 0 ? empresa.atividades.cnaeSecundarios.join(", ") : "—"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
