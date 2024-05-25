import { Request, Response } from 'express';
import { dadosUsuario } from '../config/passport';
import * as ServiceCategoria from '../services/serviceCategoria';
import * as ServiceFuncionario from '../services/serviceFuncionario';


declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//Cadastra uma nova categoria para loja
export const cadastrarCategoria = async (req: Request, res: Response) => {

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  const { nome, prioridade } = req.body;
  
  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

      if(funcionario){
        await ServiceCategoria.criarCategoria(funcionario.id_loja, nome, prioridade);
        return res.status(200).json({ success: true });
      }
    }

    throw new Error('Você não tem permissão para acessar/alterar os dados desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}

  /*
  
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




