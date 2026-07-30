export function findContadorDaEmpresa(contadores, codigoEmpresa) {
  return contadores.find((c) => c.empresasAtendidas.includes(codigoEmpresa));
}
