import { Request, Response } from 'express';
import { dadosUsuario, gerarPayload, gerarToken } from '../config/passport';
import { fazerLogin } from '../services/serviceLogin';
import { pegarUsuario } from '../services/serviceUsuario';
import { pegarFuncinario } from '../services/serviceFuncionario';

declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}


//FAZER LOGIN
export const login = async (req: Request, res: Response) => {

  const { login, senha } = req.body;

  try {
    
   const id_login= await fazerLogin(login, senha);
   const usuario= await pegarUsuario(id_login);

  if(usuario){
    const funcinario= await pegarFuncinario(usuario.id_usuario);
    const payload= gerarPayload(usuario.id_usuario, funcinario ? funcinario.id_funcionario : null, usuario.nome, usuario.sobrenome, usuario.avatar);
    const token = gerarToken(payload);

    return res.status(200).json({ success: true, token: token });
  }
   
  throw new Error('Usuario não encontrado'); 
   
   
  } catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
};