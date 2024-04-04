import { Op } from 'sequelize';
import { Produto } from '../models/Produto';
import { palavraPadronizado } from './helper';
import { Bairro } from '../models/Bairro';


//cadastra um novo produto
export const criarBairro = async ( nome: string, cidade: string) => {

  const nomePadronizado = palavraPadronizado(nome);
  const cidadePadronizado = palavraPadronizado(cidade);

  try {
    const bairro = await Bairro.create({
      nome: nomePadronizado,
      cidade: cidadePadronizado
    });

    return bairro;
    
  } catch (error: any) {
    throw error;
  }
}

// atualiza o valor na tabela produto para o preço minimo
export const atualizaPrecoMin = async (id_produto: number, valor: number, transaction: any ) => {

  try {
    const produto = await Produto.findByPk(id_produto);

    if (valor && produto && produto.tipo!="fixo" && (produto.preco > valor || produto.preco==0)) {
      produto.preco= valor;
      await produto.save(transaction);
    }
    
    return true;
    
  } catch (error: any) {
    throw error;
  }
}


/*
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
}*/



//lista todos os produtos de uma loja pelo id_loja
export const pegarProdutos = async (id_loja: string) => {
  try {
    const produtos = await Produto.findAll({
      where: {
        id_loja: id_loja,
        status: {
          [Op.ne]: 'arquivado'
        }
      },
      raw: true
    });
    
    return produtos;
    
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
        produto.imagem= avatar ?? produto.imagem;
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