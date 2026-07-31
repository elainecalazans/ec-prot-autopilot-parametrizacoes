import { ArrowRight } from "lucide-react";
import { T } from "../../../components/ui";

// Ícone de "abrir cadastro" — deliberadamente diferente do chevron de
// expandir filiais (que gira no lugar), pra deixar claro que esta ação leva
// pra outra tela. Depende da linha ancestral ter className="group" (ver
// LinhaEmpresaClicavel) pra reagir ao hover/foco.
export default function IconeAcaoNavegar() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
      style={{ color: T.mutedForeground }}
    />
  );
}
