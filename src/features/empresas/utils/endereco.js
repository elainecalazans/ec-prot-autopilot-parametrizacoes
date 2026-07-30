export function formatarEndereco(dadosGerais) {
  const { logradouro, numero, complemento, bairro, municipio, uf, cep } = dadosGerais;
  const numeroComplemento = complemento ? `${numero}, ${complemento}` : numero;
  return `${logradouro}, ${numeroComplemento} — ${bairro} — ${municipio}/${uf} · CEP ${cep}`;
}
