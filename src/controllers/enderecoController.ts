import { Request, Response } from 'express';
import { dadosUsuario } from '../config/passport';
import { pegar1Funcionario } from '../services/serviceUsuario';
import { alterarProduto, criarProduto, pegarProdutos } from '../services/serviceProduto';
import { criarEndereco, pegarEnderecos } from '../services/serviceEndereco';


declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//Cadastra um produto novo
export const cadastrarEndereco = async (req: Request, res: Response) => {
  const id_usuario: number = req.user?.id_usuario || 0;

  const { estado, cidade, bairro, rua, numero, referencia, descricao } = req.body;
console.log(id_usuario);
  
  try {
    const endereco= await criarEndereco(id_usuario, estado, cidade, bairro, rua, numero, referencia, descricao);
    
    return res.status(200).json({ success: true, endereco: endereco });
   
  }catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
}


  
//lista todos os produtos de uma loja com base no id_loja
export const listarEnderecos = async (req: Request, res: Response) => {

  const id_usuario: number = req.user?.id_usuario || 0;

  try {
    const enderecos= await pegarEnderecos(id_usuario);
    
    return res.status(200).json({ success: true, enderecos: enderecos });
  } catch (error: any) {
    return res.json({success: false, error: "Erro ao encontrar produtos"});
  }
}


export const atualizarProduto = async (req: Request, res: Response) => {
  const id_produto = req.params.id_produto;
  const id_usuario: number = req.user?.id_usuario || 0;

  const { nome, avatar, descricao, categoria } = req.body;
  
    try {
      const funcionario = await pegar1Funcionario(id_usuario);    
      await alterarProduto(id_produto, nome, avatar, descricao, categoria, Number(funcionario?.id_loja));
      
      return res.status(200).json({ success: true });
      
    } catch (error:any) {
      return res.json({ success: false, error: error.message });
    }  
};