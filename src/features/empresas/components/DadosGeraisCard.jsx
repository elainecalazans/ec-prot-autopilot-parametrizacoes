import {
  Card,
  CardHeader,
  CardTitle,
} from "../../../components/ui";
import AvisoSomenteLeitura from "./AvisoSomenteLeitura";
import CertificadoDigital from "./CertificadoDigital";
import DadosGeraisEmpresa from "./DadosGeraisEmpresa";
import HistoricoEmpresa from "./HistoricoEmpresa";

export default function DadosGeraisCard({ contadorVinculado, empresa, setCadastroDetalheTab }) {
  const dg = empresa.dadosGerais;
  return (
    <Card className="gap-7 max-w-2xl">
      <CardHeader>
        <CardTitle>Dados gerais</CardTitle>
        <AvisoSomenteLeitura />
      </CardHeader>

      <DadosGeraisEmpresa dadosGerais={dg} />
      <HistoricoEmpresa contadorVinculado={contadorVinculado} dadosGerais={dg} setCadastroDetalheTab={setCadastroDetalheTab} />
      <CertificadoDigital dadosGerais={dg} />
    </Card>
  );
}
