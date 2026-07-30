import { CardContent } from "../../../components/ui";
import CampoDado from "./CampoDado";
import SecaoDados from "./SecaoDados";

export default function CertificadoDigital({ dadosGerais }) {
  return (
    <CardContent className="flex flex-col gap-6">
      <SecaoDados titulo="Documentação">
        <CampoDado className="col-span-2" label="Certificado digital" value={dadosGerais.certificadoDigital} />
      </SecaoDados>

      <SecaoDados titulo="Observações">
        <CampoDado className="col-span-2" label="Observações gerais" value={dadosGerais.observacoesGerais || "—"} />
      </SecaoDados>
    </CardContent>
  );
}
