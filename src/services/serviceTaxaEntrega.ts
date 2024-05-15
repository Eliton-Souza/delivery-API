import { pegarIdsBairros } from './serviceBairro';
import { TaxaEntrega } from '../models/TaxaEntrega';


export const instanciasTaxa = async (id_loja: number, cidade: string, transaction: any) => {
  try {

    const bairrosIds= await pegarIdsBairros(cidade);

    // Adicione o id_bairro a cada objeto
    const novasTaxas = bairrosIds.map(({ id_bairro }) => ({
      id_loja: id_loja,
      id_bairro: id_bairro,
      taxa: null,
    }));
    
    //Insire os elementos em lote
    await TaxaEntrega.bulkCreate(novasTaxas, { transaction });

  } catch (error: any) {
    throw error;
  }
};