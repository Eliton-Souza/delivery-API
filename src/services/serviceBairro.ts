import { palavraPadronizado } from './helper';
import { Bairro } from '../models/Bairro';


//cadastra um novo bairro
export const criarBairro = async ( nome: string, cidade: string) => {

  const nomePadronizado = palavraPadronizado(nome);
  const cidadePadronizado = palavraPadronizado(cidade);

  try {
    const bairro = await Bairro.create({
      nome: nomePadronizado,
      cidade: cidadePadronizado
    });

    return bairro;
    
  } catch (error: any) {
    throw error;
  }
}


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
}