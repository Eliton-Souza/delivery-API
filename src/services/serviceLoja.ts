import { Op } from 'sequelize';
import { Loja } from '../models/Loja';
import { deletarImagemS3 } from './serviceAWS';
import { HorarioLoja } from '../models/HorarioLoja';
import { format } from 'date-fns';
import { Produto } from '../models/Produto';
import { Categoria } from '../models/Categoria';

//cadastra uma nova loja
export const criarLoja = async (nome: string, tipo: string, transaction: any) => {

  try {
    const loja = await Loja.create({
      nome,
      entrega: null,
      bloqueado: true,
      nota: null,
      tipo
    },{ transaction });

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

    const diaSemanaAM = format(new Date(), 'EEEE', { locale: require('date-fns/locale/pt-BR') });

      query = { 
        where: { nome: identificador },
        include: [
          {
            model: HorarioLoja,
            where: { diaSemana: diaSemanaAM },
            attributes: { exclude: ['id_loja'] }
          },
          {
            model: Produto,
            where: { status: { [Op.ne]: 'arquivado' }},
            attributes: { exclude: ['id_loja'] }
          },
          {
            model: Categoria,
            include: [
              {
                model: Produto
              },
            ]
          },
        ]
      };
    }
     else if (typeof identificador === 'number') {  
      query = {
        where: 
          {id_loja: identificador},
          include: [
            {
              model: HorarioLoja,         //melhora: chamar todos os horarios apenas quando funcionario for editar
              attributes: { 
                exclude: ['id_loja']
              }
            },
            {
              model: Categoria,
              attributes: { 
                exclude: ['id_loja']
              },
              include: [
                {
                  model: Produto,
                },
              ],
            },
          ],
          order: [
            [{ model: Categoria }, 'prioridade', 'DESC']  // Ordena pela prioridade do Categoria
          ]
      };
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


//edita imagens da loja
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


//edita nome e contato da loja
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

//edita o tempo de entrega da loja
export const editaTempoEntrega = async (id_loja: number, tempo: string) => {

  try {
    const loja = await Loja.findByPk(id_loja);
      
    if (loja) {
      loja.entrega= tempo ?? null;
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