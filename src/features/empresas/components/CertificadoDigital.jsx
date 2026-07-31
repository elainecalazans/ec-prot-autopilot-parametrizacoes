import { T, CardContent } from "../../../components/ui";
import CampoDado from "./CampoDado";
import SecaoDados from "./SecaoDados";

export default function CertificadoDigital({ dadosGerais }) {
  return (
    <CardContent>
      <SecaoDados titulo="Complementares">
        <CampoDado label="Certificado digital" value={dadosGerais.certificadoDigital} />
        <CampoDado
          className="col-span-2"
          label="Observações gerais"
          value={dadosGerais.observacoesGerais || <span className="italic" style={{ color: T.mutedForeground }}>Nenhuma observação cadastrada.</span>}
        />
      </SecaoDados>
    </CardContent>
  );
}
