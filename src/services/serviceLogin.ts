import { Response } from 'express';
import { PessoaInstace } from '../models/Pessoa/Pessoa';
import { AlunoInstace } from '../models/Pessoa/Aluno';
import { LiderInstace } from '../models/Pessoa/Lider';
import { ResponsavelInstace, } from '../models/Pessoa/Responsavel';
import { Login } from '../models/Login';

const bcrypt = require('bcryptjs');

export const gerarLogin = async (email: string, celular: string, senha: string, transaction: any) => {

  try {
    const senhaHash= await bcrypt.hash(senha, 10);
    console.log(senhaHash);

    const login = await Login.create({
      email,
      celular,
      senha: senhaHash,
    }, { transaction });

    return login.id_login;
    
  } catch (error: any) {
    throw error;
  }
}



//ALTERAÇÕES DE UPDATE NO BANCO
type tipoPessoa= AlunoInstace | ResponsavelInstace | LiderInstace | PessoaInstace;
async function salvarObjeto(objeto: tipoPessoa, res: Response) {
  try {
    await objeto.save();
  } catch (error: any) {
    throw error;
  }
}

export const salvarPessoa = async (obj1: tipoPessoa, obj2: tipoPessoa, res: Response) => {
  await salvarObjeto(obj1, res);
  await salvarObjeto(obj2, res);
};