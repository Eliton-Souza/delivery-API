import { palavraPadronizado } from './helper';
import { Categoria, CategoriaInstance } from '../models/Categoria';
import { sequelize } from '../instances/mysql';


//cadastrar uma nova categoria para loja
export const criarCategoria = async (id_loja: number, nome: string, prioridade: number) => {

  const nomePadronizado = palavraPadronizado(nome);

  try {
    const categoria= await Categoria.create({
      id_loja,
      nome: nomePadronizado,
      prioridade
    });

    return categoria;
    
  } catch (error: any) {
    throw error;
  }
}

// Edita horarios com transação
export const editarPrioridadeCategorias = async (categorias: CategoriaInstance[], id_loja: number) => {

  const transaction = await sequelize.transaction(); // Inicia a transação

  try {
    for (const item of categorias) {

      const categoria = await Categoria.findByPk(item.id_categoria, {transaction});
      
      if (categoria && categoria.id_loja == id_loja) {
        categoria.prioridade = item.prioridade;
        await categoria.save({ transaction });
      }
      else{
        throw new Error('Você não tem permissão para acessar esses dados');
      }
    }

    await transaction.commit(); // Confirma a transação após todas as operações serem concluídas

  } catch (error: any) {
    await transaction.rollback(); // Desfaz a transação em caso de erro
    throw error;
  }
};



//lista todos as categorias de uma loja
export const pegarCategorias = async (id_loja: number) => {
  try {
    const categorias = await Categoria.findAll({
      where: {
        id_loja
      },
      attributes: { 
        exclude: ['prioridade'] 
      },
      raw: true
    });
    
    return categorias;
    
  } catch (error: any) {
    throw error;
  }
}

//lista uma categoria de loja - Uso por segurança interna
export const pegaCategoria = async (id_categoria: number) => {
  try {
    const categoria = await Categoria.findByPk(id_categoria,
      {
      attributes: ['id_loja'],
      raw: true
    });

    return categoria;
    
  } catch (error: any) {
    throw error;
  }
}

/*
//lista todos os ids dos bairros (USO INTERNO)
export const pegarIdsBairros = async (cidade: string) => {
  try {
    const bairros = await Bairro.findAll({
      where: {
        cidade
      },
      attributes: ['id_bairro'],
      raw: true
    });
    
    return bairros;
    
  } catch (error: any) {
    throw error;
  }
}*/