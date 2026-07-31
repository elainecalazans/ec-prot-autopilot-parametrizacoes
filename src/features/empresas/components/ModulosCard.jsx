import {
  T,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui";
import { MODULOS_DISPONIVEIS } from "../config/empresasConfig";

export default function ModulosCard({ empresa }) {
  const habilitados = empresa.modulosHabilitados || [];

  return (
    <Card className="gap-4 max-w-2xl">
      <CardHeader>
        <CardTitle>Módulos</CardTitle>
        <CardDescription>Módulos do AutoPilot habilitados para esta empresa.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {MODULOS_DISPONIVEIS.map((modulo) => {
          const habilitado = habilitados.includes(modulo.key);
          return (
            <div
              key={modulo.key}
              className="flex items-center justify-between rounded-lg px-3 py-2.5"
              style={{ border: `1px solid ${T.border}` }}
            >
              <span className="text-sm font-medium">{modulo.label}</span>
              <Badge variant={habilitado ? "success" : "outline"}>{habilitado ? "Habilitado" : "Não habilitado"}</Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
