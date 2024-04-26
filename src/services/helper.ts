import { SaborInstance } from "../models/Sabor";

//padroniza nomes
export const palavraPadronizado = (nome: string) => {
  return nome
  .split(' ')
  .map((palavra) => {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
  })
  .join(' ');
}


export const formataSabores = (sabores: SaborInstance[]) => {

  return sabores.reduce((acc: any, sabor: any) => {
    const saborExistente = acc.find((p: any) => p.id_sabor === sabor.id_sabor);

    if (saborExistente) {
      // Produto já existe, adicione o preço ao objeto de preços
      saborExistente.precos[sabor['Precos.tamanho']] = parseFloat(sabor['Precos.preco']);
    } else {
      // Produto ainda não existe, crie um novo objeto de produto
      acc.push({
        id_sabor: sabor.id_sabor,
        nome: sabor.nome,
        imagem: sabor.imagem,
        descricao: sabor.descricao,
        categoria: sabor.categoria,
        status: sabor.status,
        precos: {
          [sabor['Precos.tamanho']]: parseFloat(sabor['Precos.preco']),
        },
      });
    }

    return acc;
  }, []);
}

// Função para extrair a chave do link da imagem
export const extractImageKey = (imageUrl: string) => {
  const parts = imageUrl.split('/');
  return parts[parts.length - 1]; // Último segmento do URL é a chave do objeto
};
