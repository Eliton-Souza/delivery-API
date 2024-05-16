import { Login } from '../models/Login';
import sequelize from 'sequelize';

const bcrypt = require('bcryptjs');

export const gerarLogin = async (email: string, celular: string, senha: string, transaction: any) => {

  try {
    const senhaHash= await bcrypt.hash(senha, 10);
    
    const login = await Login.create({
      email: email ?? null,
      celular,
      senha: senhaHash,
    }, { transaction });

    return login.id_login;
    
  } catch (error: any) {
    throw error;
  }
}


export const fazerLogin = async (login: string, senha: string) => {

  try {
    const loginUsuario = await Login.findOne({
      where: {
        [sequelize.Op.or]: [
          { email: login },
          { celular: login }
        ]
      }
    });
    
    if (!loginUsuario) {
      throw new Error('Login ou senha incorretos'); 
    }

    const match = await bcrypt.compare(senha, loginUsuario.senha);
    if (!match) {
      throw new Error('Login ou senha incorretos'); 
    }

    return loginUsuario.id_login;

  } catch (error: any) {
    throw error;
  }
};

//pega um id login de usuario utilizando o celular dele
export const pegarIdLoginUsuario = async (celular: string) => {

  try {
    const loginUsuario = await Login.findOne({
      where: {celular},
      attributes: { 
        exclude: ['email', 'celular', 'senha']
    },
    });
    
    if (!loginUsuario) {
      throw new Error('Usuário não encontrado'); 
    }

    return loginUsuario.id_login;

  } catch (error: any) {
    throw error;
  }
};