import { Badge } from "../../../components/ui";
import CampoDado from "./CampoDado";

// Aviso compacto de que os dados da seção vêm do Cockpit (somente leitura) —
// substitui a frase explicativa que antes ficava em cada card espelhado.
export default function AvisoSomenteLeitura() {
  return (
    <div className="flex items-center gap-4">
      <CampoDado label="Origem dos dados" value="Cockpit" />
      <Badge variant="outline" className="w-fit">Somente leitura</Badge>
    </div>
  );
}
