import { Request, Response } from 'express';
import { dadosUsuario } from '../config/passport';
import * as ServiceFuncionario from '../services/serviceFuncionario';


declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//Cadastra um funcionario novo
export const cadastrarFuncionario = async (req: Request, res: Response) => {
  const id_gerente: number | null = req.user?.id_funcionario || null;

  const { id_usuarioFuncionario, tipo } = req.body;
  
  try {
    if(id_gerente){
      const funcionario= await ServiceFuncionario.criarFuncionario(id_gerente, id_usuarioFuncionario, tipo);
    
      return res.status(200).json({ success: true, funcionario: funcionario });
    }
    else{
      throw new Error('Você não tem permissão para cadastrar um funcionário');
    }
       
  }catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
}


  
//lista todos os endereços de um usuario
export const listarEnderecos = async (req: Request, res: Response) => {

  const id_usuario: number = req.user?.id_usuario || 0;

  try {
    const enderecos= await ServiceFuncionario.pegarEnderecos(id_usuario);
    
    return res.status(200).json({ success: true, enderecos: enderecos });
  } catch (error: any) {
    return res.json({success: false, error: "Erro ao encontrar produtos"});
  }
}


//Edita um produto novo
export const editarEndereco = async (req: Request, res: Response) => {
  const id_usuario: number = req.user?.id_usuario || 0;
  const id_endereco = req.params.id_endereco;

  const { estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude } = req.body;
  
  try {
    const endereco= await ServiceFuncionario.editarEndereco(id_usuario, id_endereco, estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude);
    
    return res.status(200).json({ success: true, endereco: endereco });
   
  }catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
}




//deletar endereço de usuario
export const deletarEndereco = async (req: Request, res: Response) => {

  const id_endereco = req.params.id_endereco;
  const id_usuario: number = req.user?.id_usuario || 0;

  try {
    await ServiceFuncionario.deletarEndereco(id_endereco, id_usuario);
    
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}