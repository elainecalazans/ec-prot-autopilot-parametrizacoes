import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui";
import CertificadoDigital from "./CertificadoDigital";
import DadosGeraisEmpresa from "./DadosGeraisEmpresa";
import HistoricoEmpresa from "./HistoricoEmpresa";

export default function DadosGeraisCard({ contadorVinculado, empresa }) {
  const dg = empresa.dadosGerais;
  return (
    <Card className="gap-7">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{dg.razaoSocial}</CardTitle>
          <Badge variant="secondary">leitura · cockpit</Badge>
        </div>
        <CardDescription>Espelhado do Cockpit — para editar, use o cadastro de empresas do Cockpit/Contexto.</CardDescription>
      </CardHeader>

      <DadosGeraisEmpresa dadosGerais={dg} />
      <HistoricoEmpresa contadorVinculado={contadorVinculado} dadosGerais={dg} />
      <CertificadoDigital dadosGerais={dg} />
    </Card>
  );
}
