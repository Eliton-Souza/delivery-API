import { Request, Response } from 'express';
import { dadosUsuario } from '../config/passport';
import { alterarProduto } from '../services/serviceProduto';
import { criarEndereco, deletarArquivarEndereco, pegarEnderecos } from '../services/serviceEndereco';


declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//Cadastra um produto novo
export const cadastrarEndereco = async (req: Request, res: Response) => {
  const id_usuario: number = req.user?.id_usuario || 0;

  const { estado, cidade, bairro, rua, numero, referencia, descricao } = req.body;
  
  try {
    const endereco= await criarEndereco(id_usuario, estado, cidade, bairro, rua, numero, referencia, descricao);
    
    return res.status(200).json({ success: true, endereco: endereco });
   
  }catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
}


  
//lista todos os endereços de um usuario
export const listarEnderecos = async (req: Request, res: Response) => {

  const id_usuario: number = req.user?.id_usuario || 0;

  try {
    const enderecos= await pegarEnderecos(id_usuario);
    
    return res.status(200).json({ success: true, enderecos: enderecos });
  } catch (error: any) {
    return res.json({success: false, error: "Erro ao encontrar produtos"});
  }
}





//deletar endereço de usuario
export const deletarEndereco = async (req: Request, res: Response) => {

  const id_endereco = req.params.id_endereco;
  const id_usuario: number = req.user?.id_usuario || 0;

  try {
    await deletarArquivarEndereco(id_endereco, id_usuario);
    
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}