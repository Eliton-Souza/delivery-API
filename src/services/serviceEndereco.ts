import { Op } from 'sequelize';
import { Endereco } from '../models/Endereco';


//cadastra um novo endereço
export const criarEndereco = async (id_usuario: number, estado: string, cidade: string, bairro: string, rua: string, numero: string, referencia: string, descricao: string) => {

  try {
    const endereco = await Endereco.create({
      id_usuario,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      referencia,
      descricao,
      status: 'ativo'
    });

    return endereco;
    
  } catch (error: any) {
    throw error;
  }
}


//lista todos os endereços de um cliente
export const pegarEnderecos = async (id_usuario: number) => {
  try {
    const enderecos = await Endereco.findAll({
      where: {
        id_usuario,
        status: {
          [Op.ne]: 'arquivado'
        }
      },
      raw: true
    });
    
    return enderecos;
    
  } catch (error: any) {
    throw error;
  }
}