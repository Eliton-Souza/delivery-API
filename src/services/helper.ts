//padroniza nomes
export const palavraPadronizado = (nome: string) => {
  return nome
  .split(' ')
  .map((palavra) => {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
  })
  .join(' ');
}
