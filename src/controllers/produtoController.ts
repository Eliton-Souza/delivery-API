import { Request, Response } from 'express';
import { sequelize } from '../instances/mysql';
import { dadosUsuario } from '../config/passport';
import { pegar1Funcionario } from '../services/serviceUsuario';
import { alterarProduto, criarProduto, pegarProdutos, registrarTamPreco } from '../services/serviceProduto';



declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//MELHORAR ESSE TIPO DE USUARIO E RESTRINGIR ACESSO APENAS DEPOIS DE VALIDAR CONTATO
export const cadastrarProduto = async (req: Request, res: Response) => {

  const transaction = await sequelize.transaction();
  const { id_loja, nome, avatar, descricao, categoria, tam_preco } = req.body;
  const tam_preco_json = JSON.parse(tam_preco);

  try {
    const produto= await criarProduto(id_loja, nome, avatar, descricao, categoria, transaction);

    for (const chave in tam_preco_json) {
      if (Object.hasOwnProperty.call(tam_preco_json, chave)) {
        const valor = parseFloat(tam_preco_json[chave]);
        await registrarTamPreco(produto.id_produto, chave, valor, transaction);
      }
    }

    await transaction.commit();       
    return res.status(200).json({ success: true });
   
  }catch (error: any) {
    await transaction.rollback();
    return res.json({ success: false, error: error.message });
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


  /*DELETE: VERIFICAR SE O PRODUTO ESTÁ EM ALGUM PEDIDO
    SE SIM: STATUS = ARQUIVADO
    SE NAO: DELETA DO BANCO 
  */



