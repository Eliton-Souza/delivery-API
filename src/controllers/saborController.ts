import { Request, Response } from 'express';
import { sequelize } from '../instances/mysql';
import { dadosUsuario } from '../config/passport';
import { atualizaPrecoMin } from '../services/serviceProduto';
import { criarSabor, pegarSabores } from '../services/serviceSabor';
import { registrarTamPreco } from '../services/servicePreco';


declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}
/*

export const cadastrarSabor = async (req: Request, res: Response) => {

  const transaction = await sequelize.transaction();

  const { id_produto, nome, imagem, descricao, categoria, tam_preco } = req.body;
  const tam_preco_json = JSON.parse(tam_preco);
  let menorValor = Infinity;

  try {
    const sabor= await criarSabor(id_produto, nome, imagem, descricao, categoria);

    for (const chave in tam_preco_json) {
      if (Object.hasOwnProperty.call(tam_preco_json, chave)) {
        const valor = parseFloat(tam_preco_json[chave]);
        if (valor < menorValor) {
          menorValor = valor;
        }
        await registrarTamPreco(sabor.id_sabor, chave, valor, transaction);
      }
    }

    await atualizaPrecoMin(id_produto, menorValor, transaction)

    await transaction.commit();       
    return res.status(200).json({ success: true });
   
  }catch (error: any) {
    await transaction.rollback();
    return res.json({ success: false, error: error.message });
  }
}



  
//lista todos os sabores de um produto
export const listarSabores = async (req: Request, res: Response) => {

  const id_produto = req.params.id_produto;

  try {
    const sabores= await pegarSabores(id_produto);
    
    return res.status(200).json({ success: true, sabores: sabores });
  } catch (error: any) {
    return res.json({success: false, error: "Erro ao encontrar sabores"});
  }
}

/*
export const atualizarSabor = async (req: Request, res: Response) => {
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




