import { ProdutoInstance } from "../models/Produto";

//padroniza nomes
export const palavraPadronizado = (nome: string) => {
  return nome
  .split(' ')
  .map((palavra) => {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
  })
  .join(' ');
}


export const formataProdutos = (produtos: ProdutoInstance[]) => {

  return produtos.reduce((acc: any, produto: any) => {
    const produtoExistente = acc.find((p: any) => p.id_produto === produto.id_produto);

    if (produtoExistente) {
      // Produto já existe, adicione o preço ao objeto de preços
      produtoExistente.precos[produto['Precos.tamanho']] = parseFloat(produto['Precos.preco']);
    } else {
      // Produto ainda não existe, crie um novo objeto de produto
      acc.push({
        id_produto: produto.id_produto,
        nome: produto.nome,
        avatar: produto.avatar,
        descricao: produto.descricao,
        categoria: produto.categoria,
        status: produto.status,
        precos: {
          [produto['Precos.tamanho']]: parseFloat(produto['Precos.preco']),
        },
      });
    }

    return acc;
  }, []);
}
