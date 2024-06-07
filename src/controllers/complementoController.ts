import { Request, Response } from 'express';
import { dadosUsuario } from '../config/passport';
import * as ServiceFuncionario from '../services/serviceFuncionario';
import * as ServiceComplemento from '../services/serviceComplemento';
import * as ServiceGrupo from '../services/serviceGrupo';


declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//Cria um novo grupo para a loja
export const criarComplemento = async (req: Request, res: Response) => {

  const id_usuario: number | null = req.user?.id_usuario || null;

  const { id_grupo, nome, preco } = req.body;

  try {
    if(id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

      if(funcionario){
        const grupo= await ServiceGrupo.pegaGrupo(id_grupo);

        if(grupo && grupo.id_loja == funcionario.id_loja){
          const complemento = await ServiceComplemento.criarComplemento(id_grupo, nome, preco);
          return res.status(200).json({ success: true, complemento: complemento });
        }
      }
    }

    throw new Error('Você não tem permissão para acessar os dados desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}