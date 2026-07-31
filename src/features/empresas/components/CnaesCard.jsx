import {
  T,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui";
import AvisoSomenteLeitura from "./AvisoSomenteLeitura";

export default function CnaesCard({ empresa }) {
  return (
    <Card className="gap-4 max-w-2xl">
      <CardHeader>
        <CardTitle>Atividades</CardTitle>
        <AvisoSomenteLeitura />
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px]" style={{ color: T.mutedForeground }}>CNAE principal</span>
          <span className="text-sm">{empresa.atividades.cnaePrincipal}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px]" style={{ color: T.mutedForeground }}>CNAEs secundários</span>
          {empresa.atividades.cnaeSecundarios.length > 0 ? (
            <span className="text-sm">{empresa.atividades.cnaeSecundarios.join(", ")}</span>
          ) : (
            <span className="text-sm italic" style={{ color: T.mutedForeground }}>Nenhum CNAE secundário cadastrado.</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
