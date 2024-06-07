import { Grupo } from '../models/Grupo';
import { palavraPadronizado } from './helper';

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

//pega os dados de 1 grupo --Uso interno
export const pegaGrupo = async (id_grupo: number) => {
  try {
    const grupo = await Grupo.findByPk(id_grupo);
    
    return grupo;
    
  } catch (error: any) {
    throw error;
  }
}

//Edita o nome de um grupo
export const editarGrupo = async (id_grupo: number, id_loja: number, nome: string) => {

  try {
    const grupo = await Grupo.findByPk(id_grupo);
    
    if (grupo && grupo.id_loja == id_loja) {
      grupo.nome = nome ? palavraPadronizado(nome) : grupo.nome;
      await grupo.save();
      return true;
    }
    
    throw new Error('Você não tem permissão para acessar esses dados');
    
  } catch (error: any) {
    throw error;
  }
};