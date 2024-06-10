import { Request, Response } from 'express';
import * as ServiceFuncionario from '../services/serviceFuncionario';
import * as ServiceGrupo from '../services/serviceGrupo';

//Cria um novo grupo para a loja
export const criarGrupos = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;

  const { nome, tipo } = req.body;

  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

      if(funcionario){
        const grupo= await ServiceGrupo.criarGrupo(funcionario.id_loja, nome, tipo);
        return res.status(200).json({ success: true, grupo: grupo });
      }
    }

    throw new Error('Você não tem permissão para acessar os dados desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}

//Lista todos os grupos de uma loja
export const pegarGrupos = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;

  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

      if(funcionario){
        const grupos= await ServiceGrupo.pegarGrupos(funcionario.id_loja);
        return res.status(200).json({ success: true, grupos: grupos });
      }
    }

    throw new Error('Você não tem permissão para acessar os dados desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}


//edita o nome de um grupo
export const editarGrupo = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;

  const { id_grupo, nome } = req.body;

  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

      if(funcionario){
        await ServiceGrupo.editarGrupo(id_grupo, funcionario.id_loja, nome);
        return res.json({ success: true });
      }
    }

    throw new Error('Você não tem permissão para acessar os dados desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}