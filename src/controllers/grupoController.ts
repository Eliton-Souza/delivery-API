import { Request, Response } from 'express';
import { dadosUsuario } from '../config/passport';
import * as ServiceFuncionario from '../services/serviceFuncionario';
import * as ServiceTaxas from '../services/serviceTaxaEntrega';
import * as ServiceGrupo from '../services/serviceGrupo';
import { editaTempoEntrega } from '../services/serviceLoja';

declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//Cria um novo grupo para a loja
export const criarGrupos = async (req: Request, res: Response) => {

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  const { nome, tipo } = req.body;

  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

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

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

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

  const id_usuario: number | null = req.user?.id_usuario || null;

  const { id_grupo, nome } = req.body;

  try {
    if(id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

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





/*
//rota publica, lista os dados de um grupo
export const pegarGrupoComplemento = async (req: Request, res: Response) => {

  const id_grupo = req.params.id_grupo;

  try {
    const loja= await ServiceLoja.pegarDadosLoja(nome_loja);
    
    return res.status(200).json({ success: true, loja: loja });
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}*/