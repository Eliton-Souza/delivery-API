import { Request, Response } from 'express';
import * as ServiceFuncionario from '../services/serviceFuncionario';
import * as ServiceComplemento from '../services/serviceComplemento';
import * as ServiceGrupo from '../services/serviceGrupo';


//Cria um novo grupo para a loja
export const criarComplemento = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;

  const { id_grupo, nome, preco } = req.body;

  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

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

//rota publica, lista os complementos de um grupo
export const pegarComplementos = async (req: Request, res: Response) => {

  const id_grupo = req.params.id_grupo;

  try {
    const complementos= await ServiceComplemento.pegarComplementos(id_grupo);
    
    return res.status(200).json({ success: true, complementos: complementos });
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}