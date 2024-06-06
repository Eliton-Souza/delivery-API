import { Grupo } from '../models/Grupo';

export const criarGrupo = async (id_loja: number, nome: string, tipo: string) => {

  try {
    const grupo= await Grupo.create({
      id_loja,
      nome,
      tipo
    });

    return grupo;
    
  } catch (error: any) {
    throw error;
  }
}