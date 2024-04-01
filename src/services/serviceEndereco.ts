import { Op } from 'sequelize';
import { Endereco } from '../models/Endereco';


//cadastra um novo endereço
export const criarEndereco = async (id_usuario: number, estado: string, cidade: string, bairro: string, rua: string, numero: string, referencia: string, descricao: string) => {

  try {
    const endereco = await Endereco.create({
      id_usuario,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      referencia,
      descricao,
      status: 'ativo'
    });

    return endereco;
    
  } catch (error: any) {
    throw error;
  }
}


//lista todos os endereços de um cliente
export const pegarEnderecos = async (id_usuario: number) => {
  try {
    const enderecos = await Endereco.findAll({
      where: {
        id_usuario,
        status: {
          [Op.ne]: 'arquivado'
        }
      },
      raw: true
    });
    
    return enderecos;
    
  } catch (error: any) {
    throw error;
  }
}


//deleta ou arquiva endereço de um cliente
//FAZER O DE ARQUIVAR QUANDO TIVER FEITO PEDIDO COM O ENDERECO
export const deletarArquivarEndereco = async (id_endereco: string, id_usuario: number) => {
  try {
    const endereco= await Endereco.findByPk(id_endereco);

    if(endereco){
      if(endereco.id_usuario == id_usuario){
        await Endereco.destroy({where:{id_endereco}});
      }
      else{
        throw new Error('Você não tem autorização para deletar este endereço');
      }
    }
    else{
      throw new Error('Endereço não encontrado');
    }
  } catch (error: any) {
    throw error;
  }
}