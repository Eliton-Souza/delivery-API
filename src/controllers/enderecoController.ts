import { Request, Response } from 'express';
import * as ServiceEndereco from '../services/serviceEndereco';


//Cadastra um endereço novo
export const cadastrarEndereco = async (req: Request, res: Response) => {
  const id_usuario: number = req.usuario.id_usuario;

  const { estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude } = req.body;
  
  try {
    const endereco= await ServiceEndereco.criarEndereco(id_usuario, estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude);
    
    return res.status(200).json({ success: true, endereco: endereco });
   
  }catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
}


  
//lista todos os endereços de um usuario
export const listarEnderecos = async (req: Request, res: Response) => {

  const id_usuario: number = req.usuario.id_usuario;

  try {
    const enderecos= await ServiceEndereco.pegarEnderecos(id_usuario);
    
    return res.status(200).json({ success: true, enderecos: enderecos });
  } catch (error: any) {
    return res.json({success: false, error: "Erro ao encontrar produtos"});
  }
}


//Edita um produto novo
export const editarEndereco = async (req: Request, res: Response) => {
  const id_usuario: number = req.usuario.id_usuario;
  const id_endereco = req.params.id_endereco;

  const { estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude } = req.body;
  
  try {
    const endereco= await ServiceEndereco.editarEndereco(id_usuario, id_endereco, estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude);
    
    return res.status(200).json({ success: true, endereco: endereco });
   
  }catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
}




//deletar endereço de usuario
export const deletarEndereco = async (req: Request, res: Response) => {

  const id_endereco = req.params.id_endereco;
  const id_usuario: number = req.usuario.id_usuario;

  try {
    await ServiceEndereco.deletarEndereco(id_endereco, id_usuario);
    
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}