import { Request, Response } from 'express';
import { dadosUsuario } from '../config/passport';
import { criarBairro, pegarBairros } from '../services/serviceBairro';


declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//Cadastra um bairro novo
export const cadastrarBairro = async (req: Request, res: Response) => {

  const { nome, cidade } = req.body;
  
  try {
    const bairro= await criarBairro( nome, cidade);
    
    return res.status(200).json({ success: true, bairro: bairro });
   
  }catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
}


  
  
//lista todos os bairros de uma cidade
export const listarBairros = async (req: Request, res: Response) => {

  const cidade = req.params.cidade;

  try {
    const bairros= await pegarBairros(cidade);
    
    return res.status(200).json({ success: true, bairros: bairros });
  } catch (error: any) {
    return res.json({success: false, error: "Erro ao encontrar bairros"});
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




