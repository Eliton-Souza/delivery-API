import { Op } from 'sequelize';
import { Loja } from '../models/Loja';
import { deletarImagemS3 } from './serviceAWS';
import { HorarioLoja, HorarioLojaInstance } from '../models/HorarioLoja';
import { sequelize } from '../instances/mysql';

//cadastra uma lista de novos horários
//REFAZER COM A ALTERAÇÕES
export const criarHorarios = async (id_loja: number, horarios: HorarioLojaInstance[]) => {
  try {
    // Verifique se a lista de elementos não está vazia
    if (horarios.length === 0) {
      throw new Error('Lista de horários está vazia.');
    }
    console.log(horarios);

    // Adicione o id_loja a cada objeto FuncionamentoLojaInstance
    const horariosComIdLoja = horarios.map(horario => ({
      diaSemana: horario.diaSemana,
      abertura: horario.abertura1,
      fechamento: horario.fechamento1,
      id_loja: id_loja,
    }));

    // Insira os elementos em lote
    await HorarioLoja.bulkCreate(horariosComIdLoja);

  } catch (error: any) {
    console.log(error);
    throw error;
  }
};


// Edita horarios com transação
export const editarHorarios = async (horarios: HorarioLojaInstance[]) => {
  
  const transaction = await sequelize.transaction(); // Inicia a transação

  try {
    for (const horario of horarios) {

      const dia = await HorarioLoja.findByPk(horario.id_horario, {
        transaction,
        attributes: {
          exclude: ['id_loja'],
        },
      });
      
      if (dia) {
        dia.abertura1 = horario.abertura1 ? horario.abertura1 : null;
        dia.fechamento1 = horario.fechamento1 ? horario.fechamento1 : null;
        dia.abertura2 = horario.abertura2 ? horario.abertura2 : null;
        dia.fechamento2 = horario.fechamento2 ? horario.fechamento2 : null;

        await dia.save({ transaction });
      }
    }
    await transaction.commit(); // Confirma a transação após todas as operações serem concluídas

  } catch (error: any) {
    await transaction.rollback(); // Desfaz a transação em caso de erro
    throw error;
  }
};


