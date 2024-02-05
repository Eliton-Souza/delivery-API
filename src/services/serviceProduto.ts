import { Preco } from '../models/Preco';
import { Produto } from '../models/Produto';
import { palavraPadronizado } from './helper';


//cadastra um novo produto
export const criarProduto = async (id_loja: string, nome: string, avatar: string, descricao: string, categoria: string ) => {

  const nomePadronizado = palavraPadronizado(nome);

  try {
    const produto = await Produto.create({
      nome: nomePadronizado,
      id_loja,
      avatar: avatar ?? null,
      descricao: descricao ?? null,
      categoria,
      status: "ativo",
    });

    return produto;
    
  } catch (error: any) {
    throw error;
  }
}


//pega os dados basicos de um usuario
export const pegarUsuario = async (id_login: number) => {

  try {
    const usuario = await Produto.findOne({
      where: {
        id_login
      },
      attributes: ['id_usuario', 'nome', 'sobrenome', 'avatar'],
      raw: true
  });
    
    return usuario;
    
  } catch (error: any) {
    throw error;
  }
}



//lista todos os funcionarios de uma loja especifica
export const pegarProdutos = async (id_loja: string) => {

  try {
    const produtos = await Produto.findAll({
      where: {
        id_loja
      },
      include: [
        {
          model: Preco,
          attributes: ['tamanho', 'preco']
        },
      
      ],
      raw: true
  });
  
    const produtosFormatados = produtos.map((produto: any) => {
      return {
        id_produto: produto.id_produto,
        nome: produto.nome,
        avatar: produto.avatar,
        descricao: produto.descricao,
        genero: produto.categoria,
        tipo: produto.status,
        preco: produto['Preco.preco'],
        tamanho: produto['Preco.tamanho'],
      };
    });
    
    return produtosFormatados;
    
  } catch (error: any) {
    throw error;
  }
}



//atualiza os dados de um produto
export const alterarProduto = async (id_produto: string, nome: string, avatar: string, descricao: string, categoria: string, id_loja: number) => {

  try {
    const produto = await Produto.findByPk(id_produto);

    if (produto) {
      if(produto.id_loja == id_loja){

        produto.nome= nome ?? produto.nome;
        produto.avatar= avatar ?? produto.avatar;
        produto.descricao= descricao ?? produto.descricao;
        produto.categoria= categoria ?? produto.categoria;
      }
      else{
        throw new Error('Esse produto não é seu');
      }
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