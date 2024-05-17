import { pegarIdsBairros } from './serviceBairro';
import { TaxaEntrega } from '../models/TaxaEntrega';
import { Bairro } from '../models/Bairro';


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


//pegar todas as taxas de entrega para os bairros de uma loja
export const pegarTaxas = async (id_loja: number) => {
  try {
    const taxas = await TaxaEntrega.findAll({
      where: {
        id_loja
      },
      include: [
        {
          model: Bairro,
          attributes: ['nome']
        },
      ],
      attributes: { 
        exclude: ['id_loja', 'id_bairro' ] 
      },
      raw: true
    });

    const taxasFormatadas = taxas.map((taxa: any) => {
      return {
        id_taxa: taxa.id_taxa,
        bairro: taxa['Bairro.nome'],
        taxa: taxa.taxa != null ? Number(taxa.taxa).toFixed(2).replace('.', ',') : null};
    });
    
    return taxasFormatadas;
    
  } catch (error: any) {
    throw error;
  }
}