import { palavraPadronizado } from './helper';
import { Categoria } from '../models/Categoria';


//cadastrar uma nova categoria para loja
export const criarCategoria = async (id_loja: number, nome: string, prioridade: number) => {

  const nomePadronizado = palavraPadronizado(nome);

  try {
    await Categoria.create({
      id_loja,
      nome: nomePadronizado,
      prioridade
    });

    return true;
    
  } catch (error: any) {
    throw error;
  }
}

/*
//lista todos os bairros de uma cidade
export const pegarBairros = async (cidade: string) => {
  try {
    const bairros = await Bairro.findAll({
      where: {
        cidade
      },
      raw: true
    });
    
    return bairros;
    
  } catch (error: any) {
    throw error;
  }
}


//lista todos os ids dos bairros (USO INTERNO)
export const pegarIdsBairros = async (cidade: string) => {
  try {
    const bairros = await Bairro.findAll({
      where: {
        cidade
      },
      attributes: ['id_bairro'],
      raw: true
    });
    
    return bairros;
    
  } catch (error: any) {
    throw error;
  }
}*/