import { Produto } from '../models/Produto';
import { formataPreco, palavraPadronizado } from './helper';


//cadastra um novo produto
export const criarProduto = async (nome: string, preco: number, tipo: string, id_categoria: string, imagem: string, descricao: string, transaction: any ) => {

  const nomePadronizado = palavraPadronizado(nome);
  const descricaoPadronizada= descricao.replace(/\n+/g, ' ');
  const precoPadronizado=  formataPreco(preco);

  try {
    const produto = await Produto.create({
      nome: nomePadronizado,
      preco:precoPadronizado,
      tipo,
      id_categoria,
      descricao: descricao ? descricaoPadronizada : null,
      status: 0,
      imagem: imagem ?? null,
    }, { transaction });

    return produto;
    
  } catch (error: any) {
    throw error;
  }
}

//atualiza os dados de um produto
export const alterarProduto = async (id_produto: string, nome: string, avatar: string, descricao: string, categoria: string, id_loja: number) => {

  try {
    const produto = await Produto.findByPk(id_produto);

    if (produto) {
      produto.nome= nome ?? produto.nome;
      produto.imagem= avatar ?? produto.imagem;
      produto.descricao= descricao ?? produto.descricao;
    }
    else{
      throw new Error('Produto não encontrado');
    }

    // Salvar as alterações no banco de dados
    await produto.save();
    return true;
    
  } catch (error: any) {
    throw error;
  }
}