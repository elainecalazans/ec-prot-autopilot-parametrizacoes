import { Clock } from "lucide-react";
import { T, Card, CardContent, Badge } from "../ui";

/* ================================================================================
   ComingSoonFeature — placeholder reutilizável para trilhas que já têm código e
   conteúdo implementados, mas cuja navegação foi temporariamente redirecionada
   enquanto aguardam refinamento com Produto/Operação (ver RegrasGeraisPage,
   TRILHAS_EM_BREVE). Trocar de volta pela tela real é só remover a chave da
   trilha desse mapa — nenhum código das trilhas foi alterado ou removido.
   ================================================================================ */
export default function ComingSoonFeature({ title, description, status = "Próxima entrega", icon: Icon = Clock }) {
  return (
    <div className="flex flex-1 items-center justify-center p-6 min-h-[60vh]">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center size-12 rounded-full" style={{ background: T.muted, color: T.mutedForeground }}>
            <Icon className="size-6" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold" style={{ color: T.foreground }}>{title}</h2>
              {status && <Badge variant="warning">{status}</Badge>}
            </div>
            <p className="text-sm" style={{ color: T.mutedForeground }}>{description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
