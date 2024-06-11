import { PrecoPizza } from '../models/PrecoPizza';

export const registrarTamPreco = async (id_sabor: number, tamanho: string, preco: number, transaction: any ) => {

  try {
    await PrecoPizza.create({
      id_sabor,
      tamanho,
      preco
    }, { transaction });

    return true;
    
  } catch (error: any) {
    throw error;
  }
}


export const registrarPreco = async (id_produto: number, id_sabor: number | null, preco: number, transaction: any ) => {

  try {
    await PrecoPizza.create({
      id_produto,
      id_sabor,
      preco,
      uniqueKey: `${id_produto}-${id_sabor}`
    }, { transaction });

    return true;
    
  } catch (error: any) {
    throw error;
  }
}

export const atualizaPrecoMin = async (id_produto: number, tamanho: string, preco: number, transaction: any ) => {

  try {
    await PrecoPizza.create({
      id_produto,
      tamanho,
      preco
    }, { transaction });

    return true;
    
  } catch (error: any) {
    throw error;
  }
}
