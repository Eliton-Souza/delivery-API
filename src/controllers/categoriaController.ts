import { Request, Response } from 'express';
import * as ServiceCategoria from '../services/serviceCategoria';
import * as ServiceFuncionario from '../services/serviceFuncionario';


//Cadastra uma nova categoria para loja
export const cadastrarCategoria = async (req: Request, res: Response) => {
  const id_funcionario: number = req.funcionario.id_funcionario;
  const { nome, prioridade } = req.body;
  
  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

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

  const id_funcionario: number = req.funcionario.id_funcionario;

  const { categorias } = req.body;

  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

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

  

//lista todos as categorias de uma loja
export const listarCategorias = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;

  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

      if(funcionario){
        const categorias= await ServiceCategoria.pegarCategorias(funcionario.id_loja);
        return res.json({ success: true, categorias: categorias });
      }
    }

    throw new Error('Você não tem permissão para acessar os dados desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}


