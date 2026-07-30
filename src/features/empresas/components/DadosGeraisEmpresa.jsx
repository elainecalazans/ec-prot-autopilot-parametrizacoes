import { CardContent } from "../../../components/ui";
import { formatarEndereco } from "../utils/endereco";
import CampoDado from "./CampoDado";
import SecaoDados from "./SecaoDados";

export default function DadosGeraisEmpresa({ dadosGerais }) {
  return (
    <CardContent className="flex flex-col gap-6">
      <SecaoDados titulo="Identificação">
        <CampoDado className="col-span-2" label="Razão social" value={dadosGerais.razaoSocial} />
        <CampoDado label="Nome fantasia" value={dadosGerais.nomeFantasia} />
        <CampoDado label="CNPJ" value={dadosGerais.cnpj} />
        <CampoDado label="Natureza jurídica" value={dadosGerais.naturezaJuridica} />
        <CampoDado label="Regime tributário federal" value={dadosGerais.regimeTributarioFederal} />
      </SecaoDados>

      <SecaoDados titulo="Inscrições">
        <CampoDado label="Inscrição estadual" value={dadosGerais.ie} />
        <CampoDado label="Inscrição municipal" value={dadosGerais.im} />
      </SecaoDados>

      <SecaoDados titulo="Contato">
        <CampoDado label="Telefone" value={dadosGerais.telefone} />
        <CampoDado label="E-mail" value={dadosGerais.email} />
      </SecaoDados>

      <SecaoDados titulo="Endereço">
        <CampoDado className="col-span-2" label="Endereço completo" value={formatarEndereco(dadosGerais)} />
      </SecaoDados>
    </CardContent>
  );
}
