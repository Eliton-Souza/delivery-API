import { Request, Response } from 'express';
import * as ServiceFuncionario from '../services/serviceFuncionario';
import { pegarIdLoginUsuario } from '../services/serviceLogin';
import { pegarUsuario } from '../services/serviceUsuario';
import { sequelize } from '../instances/mysql';

//Gerente cadastra um novo funcionario
export const cadastrarFuncionario = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;
  
  const transaction = await sequelize.transaction();

  const { celular, tipo } = req.body;

  try {
   
    const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

    if(funcionario){
      const id_loginNovoFuncionario= await pegarIdLoginUsuario(celular);
      const usuario= await pegarUsuario(id_loginNovoFuncionario);

      if(usuario){
        const novoFuncionario= await ServiceFuncionario.criarFuncionario(funcionario.id_loja, usuario.id_usuario, tipo, transaction);
        
        await transaction.commit();
        return res.status(200).json({ success: true, funcionario: novoFuncionario });
      }
    }
    

    throw new Error('Você não tem permissão para cadastrar um funcionário');
    
  } catch (error: any) {
    await transaction.rollback();
    return res.json({success: false, error: error.message});
  }
}