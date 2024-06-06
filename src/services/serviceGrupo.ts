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


//lista todos os grupos de uma loja
export const pegarGrupos = async (id_loja: number) => {
  try {
    const grupos = await Grupo.findAll({
      where: {
        id_loja
      },
      raw: true
    });
    
    return grupos;
    
  } catch (error: any) {
    throw error;
  }
}