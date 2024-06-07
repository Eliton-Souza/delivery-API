import { Complemento } from '../models/Complemento';
import { formataPreco, palavraPadronizado } from './helper';

export const criarComplemento = async (id_grupo: number, nome: string, preco: number) => {

  try {
    const complemento= await Complemento.create({
      id_grupo,
      nome: palavraPadronizado(nome),
      preco: formataPreco(preco),
      status: 0,
    });

    return complemento;
    
  } catch (error: any) {
    throw error;
  }
}