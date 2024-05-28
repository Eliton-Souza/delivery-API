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
        const categoria= await ServiceCategoria.criarCategoria(funcionario.id_loja, nome, prioridade);
        return res.status(200).json({ success: true, categoria: categoria });
      }
    }

    throw new Error('Você não tem permissão para acessar/alterar os dados desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}


//edita uma lista de horarios
export const editarPrioridadeCategoria = async (req: Request, res: Response) => {

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  const { categorias } = req.body;

  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

      if(funcionario){
        await ServiceCategoria.editarPrioridadeCategorias(categorias, funcionario.id_loja);
        return res.json({ success: true });
      }
    }

    throw new Error('Você não tem permissão para alterar os horarios desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}

  
/*
//lista todos as categorias e produtos de uma loja
export const listarCategoriasProdutos = async (req: Request, res: Response) => {

  const id_loja = req.params.id_loja;

  try {
    const categoriasProdutos= await ServiceCategoria.pegarCategoriasProdutos(Number(id_loja));
    
    return res.status(200).json({ success: true, categoriasProdutos: categoriasProdutos });
  } catch (error: any) {
    return res.json({success: false, error: error.message});
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




