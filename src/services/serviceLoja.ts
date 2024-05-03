import { Op } from 'sequelize';
import { Loja } from '../models/Loja';
import { deletarImagemS3 } from './serviceAWS';

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

// Pega os dados de uma loja com base no nome ou ID da loja
export const pegarDadosLoja = async (identificador: string | number) => {
  try {
    let query = {};

    if (typeof identificador === 'string') {
      query = { where: { nome: identificador } };
    } else if (typeof identificador === 'number') {
      query = { where: { id_loja: identificador } };
    }
   
    const loja = await Loja.findOne(query);

    if (!loja) {
      throw new Error('Loja não encontrada');
    }

    return loja;
  } catch (error: any) {
    throw error;
  }
}

//lista todas as lojas ativas
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


//edita um endereço
export const editarPerfilLoja = async (id_loja: number, linkImagem: string, tipo: string) => {

  try {
    const loja = await Loja.findByPk(id_loja);
    let linkAnterior= null;
  
    if (loja) {
      if(tipo === "logo"){
        linkAnterior= loja.logo;
        loja.logo= linkImagem;
      }else if( tipo === "capa"){
        linkAnterior= loja.capa;
        loja.capa= linkImagem;
      }else{
        throw new Error('Tipo de imagem inválido');
      }
    }
    else{
      throw new Error('Loja não encontrada');
    }

    if(linkAnterior){
      await deletarImagemS3(linkAnterior);
    }

    // Salvar as alterações no banco de dados
    await loja.save();
        
  } catch (error: any) {
    throw error;
  }
}





//edita um endereço
export const editaNomeContato = async (id_loja: number, nome: string, contato: string) => {

  try {
    const loja = await Loja.findByPk(id_loja);
      
    if (loja) {
      loja.nome= nome;
      loja.contato= contato;
    }
    else{
      throw new Error('Loja não encontrada');
    }
    
    // Salvar as alterações no banco de dados
    await loja.save();
        
  } catch (error: any) {
    throw error;
  }
}
