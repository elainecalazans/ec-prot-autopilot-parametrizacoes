import { useEffect } from "react";
import EmpresasSection from "./components/EmpresasSection";
import QuadroSocietarioDrawer from "./components/QuadroSocietarioDrawer";
import { useEmpresas } from "./hooks/useEmpresas";

export { EMPRESAS } from "./mocks/empresasMocks";

export default function EmpresasPage({ onCrumbChange }) {
  const empresas = useEmpresas();
  const crumb = empresas.empresaCadastro
    ? `empresas / ${empresas.empresaCadastro.nome}`
    : "empresas";

  useEffect(() => {
    onCrumbChange?.(crumb);
  }, [crumb, onCrumbChange]);

  return (
    <>
      <EmpresasSection {...empresas} />
      <QuadroSocietarioDrawer {...empresas} />
    </>
  );
}
