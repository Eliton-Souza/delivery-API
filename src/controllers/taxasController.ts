import { Request, Response } from 'express';
import { dadosUsuario } from '../config/passport';
import * as ServiceFuncionario from '../services/serviceFuncionario';
import * as ServiceTaxas from '../services/serviceTaxaEntrega';
import { editaTempoEntrega } from '../services/serviceLoja';

declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//Pega todas as taxas de entrega para os bairros de uma loja
export const pegarTaxas = async (req: Request, res: Response) => {

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

      if(funcionario){
   
        const taxas= await ServiceTaxas.pegarTaxas(funcionario.id_loja);
        return res.status(200).json({ success: true, taxas: taxas });
      }
    }

    throw new Error('Você não tem permissão para acessar as taxas de entrega desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}


//edita uma lista de taxas e tempo de entrega
export const editarTaxas = async (req: Request, res: Response) => {

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  const { taxas, tempo } = req.body;

  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

      if(funcionario){
        await editaTempoEntrega(funcionario.id_loja, tempo);
        await ServiceTaxas.editarTaxas(taxas);
        return res.json({ success: true });
      }
    }

    throw new Error('Você não tem permissão para alterar as taxas de entrega desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}