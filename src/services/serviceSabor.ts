import { Op } from 'sequelize';
import { Preco } from '../models/Preco';
import { formataSabores, palavraPadronizado } from './helper';
import { Complemento } from '../models/Complemento';

//cadastra um novo sabor
export const criarSabor = async (id_produto: string, nome: string, imagem: string, descricao: string, categoria: string) => {

  const nomePadronizado = palavraPadronizado(nome);

  try {
    const sabor = await Complemento.create({
      nome: nomePadronizado,
      id_produto,
      imagem: imagem ?? null,
      descricao: descricao ?? null,
      categoria,
      status: 'ativo'
    });

    return sabor;
    
  } catch (error: any) {
    throw error;
  }
}


//lista todos os sabores de um produto
export const pegarSabores = async (id_produto: string) => {
  try {
    const sabores = await Complemento.findAll({
      where: {
        id_produto,
        status: {
          [Op.ne]: 'arquivado'
        }
      },
      include: [
        {
          model: Preco,
          attributes: ['tamanho', 'preco']
        },
      ],
      raw: true
    });

    const saboresFormatados = formataSabores(sabores);
    return saboresFormatados;
    
  } catch (error: any) {
    throw error;
  }
}


/*




//atualiza os dados de um sabor
export const alterarSabor = async (id_produto: string, nome: string, avatar: string, descricao: string, categoria: string, id_loja: number) => {

  try {
    const produto = await Produto.findByPk(id_produto);

    if (produto) {
      if(produto.id_loja == id_loja){

        produto.nome= nome ?? produto.nome;
        produto.imagem= avatar ?? produto.imagem;
        produto.descricao= descricao ?? produto.descricao;
        produto.categoria= categoria ?? produto.categoria;
      }
      else{
        throw new Error('Esse produto não é seu');
      }
    }
    else{
      throw new Error('Produto não encontrado');
    }

    // Salvar as alterações no banco de dados
    await produto.save();
    return true;
    
  } catch (error: any) {
    throw error;
  }
}*/