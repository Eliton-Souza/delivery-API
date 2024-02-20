import { Preco } from '../models/Preco';

export const registrarTamPreco = async (id_sabor: number, tamanho: string, preco: number, transaction: any ) => {

  try {
    await Preco.create({
      id_sabor,
      tamanho,
      preco
    }, { transaction });

    return true;
    
  } catch (error: any) {
    throw error;
  }
}

export const atualizaPrecoMin = async (id_produto: number, tamanho: string, preco: number, transaction: any ) => {

  try {
    await Preco.create({
      id_produto,
      tamanho,
      preco
    }, { transaction });

    return true;
    
  } catch (error: any) {
    throw error;
  }
}
