import { HorarioLoja, HorarioLojaInstance } from '../models/HorarioLoja';
import { sequelize } from '../instances/mysql';

const diasDaSemana= [
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
  'domingo'
];

//instancia uma lista de horarios para uma nova loja cadastrada
export const instanciaHorarios = async (id_loja: number, transaction: any) => {
  try {
    const horarios = diasDaSemana.map(dia => ({
      id_loja: id_loja,
      diaSemana: dia,
      abertura1: null,
      fechamento1: null,
      abertura2: null,
      fechamento2: null,
    }));

    // Insira os elementos em lote
    await HorarioLoja.bulkCreate(horarios, { transaction });

  } catch (error: any) {
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


