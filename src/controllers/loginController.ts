import { Request, Response } from 'express';
import { fazerLogin } from '../services/serviceLogin';
import { pegarUsuario } from '../services/serviceUsuario';
import { pegarFuncinario } from '../services/serviceFuncionario';
import { gerarPayloadUsuario, gerarTokenUsuario } from '../config/passportUsuario';
import { gerarPayloadFuncionario, gerarTokenFuncionario } from '../config/passportFuncionario';


//FAZER LOGIN
export const login = async (req: Request, res: Response) => {

  const { login, senha } = req.body;

  try {
    
    const id_login= await fazerLogin(login, senha);
    const usuario= await pegarUsuario(id_login);
    let token;

    if(usuario){
      const funcionario= await pegarFuncinario(id_login);

      if(funcionario){
        const payload= gerarPayloadFuncionario(funcionario.id_funcionario, usuario.nome, usuario.sobrenome, usuario.avatar);
        token = gerarTokenFuncionario(payload);
      }else{
        const payload= gerarPayloadUsuario(usuario.id_usuario, usuario.nome, usuario.sobrenome, usuario.avatar);
        token = gerarTokenUsuario(payload);
      }

      return res.status(200).json({ success: true, token: token });
    }
    
    throw new Error('Usuario não encontrado'); 

  } catch (error: any) {
    console.log(error);
    return res.json({ success: false, error: error.message });
  }
};