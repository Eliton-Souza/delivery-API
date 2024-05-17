import { pegarIdsBairros } from './serviceBairro';
import { TaxaEntrega, TaxaEntregaInstance } from '../models/TaxaEntrega';
import { Bairro } from '../models/Bairro';
import { sequelize } from '../instances/mysql';


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

// Edita taxas de entrega com transação
export const editarTaxas = async (taxas: TaxaEntregaInstance[]) => {

  const transaction = await sequelize.transaction(); // Inicia a transação

  try {
    for (const novaTaxa of taxas) {

      const taxa = await TaxaEntrega.findByPk(novaTaxa.id_taxa, {
        transaction,
        attributes: ['id_taxa','taxa']
      });
      
      if (taxa) {
        if(novaTaxa.taxa != null){
          taxa.taxa = parseFloat((novaTaxa.taxa.toString()).replace(',', '.')); // Verifica se o valor é válido antes de atribuir
        }else{
          taxa.taxa = null ; 
        }
  
        await taxa.save({ transaction });
      }
    }
    await transaction.commit(); // Confirma a transação após todas as operações serem concluídas

  } catch (error: any) {
    await transaction.rollback(); // Desfaz a transação em caso de erro
    throw error;
  }
};
