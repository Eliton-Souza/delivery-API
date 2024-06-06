import { Request, Response } from 'express';
import { dadosUsuario } from '../config/passport';
import { criarProduto, pegarProdutos } from '../services/serviceProduto';
import * as ServiceFuncionario from '../services/serviceFuncionario';
import { sequelize } from '../instances/mysql';
import { registrarPreco } from '../services/servicePreco';
import { pegaCategoria } from '../services/serviceCategoria';
import { deletarImagemS3 } from '../services/serviceAWS';

declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//Cadastra um produto novo
export const cadastrarProduto = async (req: Request, res: Response) => {

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  const transaction = await sequelize.transaction();

  const { nome, preco, tipo, id_categoria, imagem, descricao } = req.body;;
  
  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);
      const categoria= await pegaCategoria(id_categoria);

      if(funcionario && categoria && funcionario.id_loja == categoria.id_loja){

        const produto= await criarProduto(nome, tipo, id_categoria, imagem, descricao, transaction);
        await registrarPreco(produto.id_produto, null, preco, transaction);

        await transaction.commit();
        return res.status(200).json({ success: true });
      }
    }

    throw new Error('Você não tem permissão para acessar/alterar os dados desta loja');
    
  } catch (error: any) {
    if(imagem){
      await deletarImagemS3(imagem);
    }
    await transaction.rollback();
    return res.json({success: false, error: error.message});
  }
}


  
//lista todos os produtos de uma loja com base no id_loja
export const listarProdutos = async (req: Request, res: Response) => {

  const id_loja = req.params.id_loja;

  try {
    const produtos= await pegarProdutos(id_loja);
    
    return res.status(200).json({ success: true, produtos: produtos });
  } catch (error: any) {
    return res.json({success: false, error: "Erro ao encontrar produtos"});
  }
}


  /*

export const atualizarProduto = async (req: Request, res: Response) => {
  const id_produto = req.params.id_produto;
  const id_usuario: number = req.user?.id_usuario || 0;

  const { nome, avatar, descricao, categoria } = req.body;
  
    try {
      const funcionario = await pegar1Funcionario(id_usuario);    
      await alterarProduto(id_produto, nome, avatar, descricao, categoria, Number(funcionario?.id_loja));
      
      return res.status(200).json({ success: true });
      
    } catch (error:any) {
      return res.json({ success: false, error: error.message });
    }  
};

DELETE: VERIFICAR SE O PRODUTO ESTÁ EM ALGUM PEDIDO
    SE SIM: STATUS = ARQUIVADO
    SE NAO: DELETA DO BANCO 
  */




