import { Request, Response } from 'express';
import { criarProduto } from '../services/serviceProduto';
import { sequelize } from '../instances/mysql';
import { registrarPreco } from '../services/servicePreco';
import { pegaCategoria } from '../services/serviceCategoria';
import { deletarImagemS3 } from '../services/serviceAWS';
import * as ServiceFuncionario from '../services/serviceFuncionario';


//Cadastra um produto novo
export const cadastrarProduto = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;

  const transaction = await sequelize.transaction();

  const { nome, preco, tipo, id_categoria, imagem, descricao } = req.body;;
  
  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);
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
