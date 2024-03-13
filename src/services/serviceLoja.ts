import { Op } from 'sequelize';
import { Loja } from '../models/Loja';

//cadastra uma nova loja
export const criarLoja = async (nome: string, tipo: string) => {

  try {
    const loja = await Loja.create({
      nome,
      entrega: 0,
      bloqueado: true,
      aberto: false,
      nota: null,
      tipo
    });

    return loja;
    
  } catch (error: any) {
    throw error;
  }
}

// pega os dados de uma loja
export const pegarDadosLoja = async (nome: string) => {
  try {
    const loja = await Loja.findOne({
      where: {
        nome
      }
    });

    if(!loja){
      throw new Error('Loja não encontrada');
    }

    return loja;
  } catch (error: any) {
    throw error;
  }
}


//lista todos os produtos de uma loja pelo id_loja
export const pegarLojas = async () => {
  try {
    const lojas = await Loja.findAll({
      where: {
        bloqueado: {
          [Op.ne]: '1'
        }
      },
      raw: true
    });
    
    return lojas;
    
  } catch (error: any) {
    throw error;
  }
}
