// Ponto de integração com o Cockpit. Hoje não existe, em nenhum lugar do
// projeto, uma URL real de deep-link para abrir/editar uma empresa lá — esta
// função documenta o contrato esperado e mantém o botão funcional no
// protótipo. Quando a integração existir, trocar o corpo por algo como:
//
//   window.open(`${COCKPIT_BASE_URL}/empresas/${empresa.codigo}`, "_blank", "noopener,noreferrer");
//
export function abrirEmpresaNoCockpit(empresa) {
  console.info(`[Empresas] Abrir "${empresa.nome}" (${empresa.codigo}) no Cockpit — integração ainda não configurada.`);
}
