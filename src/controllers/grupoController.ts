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