import { T } from "../../../components/ui";

export default function EmpresasHeader({ emCadastro = false }) {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-1">Empresas</h1>
      {!emCadastro && (
        <p className="text-sm max-w-xl" style={{ color: T.mutedForeground }}>
          Cadastro completo por empresa. <p>Os dados são lidos do <b>Cockpit</b> e apresentados aqui para <b>visualização.</b></p>
        </p>
      )}
    </div>
  );
}
