import { Bairro } from '../models/Bairro';
import { Endereco } from '../models/Endereco';

//cadastra um novo endereço
export const criarEndereco = async (id_usuario: number, estado: string, cidade: string, id_bairro: number, rua: string, numero: string, referencia: string, descricao: string, latitude: string, longitude: string) => {

  try {
    const endereco = await Endereco.create({
      id_usuario,
      estado,
      cidade,
      id_bairro,
      rua,
      numero,
      referencia,
      descricao,
      coordenadas: (latitude && longitude) ? latitude + ',' + longitude: null,
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
        id_usuario
      },
      include: [
        {
          model: Bairro,
          attributes: ['nome']
        },
      ],
      attributes: { 
        exclude: ['id_usuario'] 
      },
      raw: true
    });

    const enderecosFormatados = enderecos.map((endereco: any) => {
      return {
        id_endereco: endereco.id_endereco,
        estado: endereco.estado,
        cidade: endereco.cidade,
        id_bairro: endereco.id_bairro,
        bairro: endereco['Bairro.nome'],
        rua: endereco.rua,
        numero: endereco.numero,
        referencia: endereco.referencia,
        descricao: endereco.descricao,
        coordenadas: endereco.coordenadas
      };
    });
    
    return enderecosFormatados;
    
  } catch (error: any) {
    throw error;
  }
}


//edita um endereço
export const editarEndereco = async (id_usuario: number, id_endereco: string, estado: string, cidade: string, id_bairro: number, rua: string, numero: string, referencia: string, descricao: string, latitude: string, longitude: string) => {

  try {
    const endereco = await Endereco.findByPk(id_endereco);
  
    if (endereco) {
      if(endereco.id_usuario == id_usuario){

        endereco.estado= estado ?? endereco.estado;
        endereco.cidade= cidade ?? endereco.cidade;
        endereco.id_bairro= id_bairro ?? endereco.id_bairro;
        endereco.rua= rua ?? endereco.rua;
        endereco.numero= numero ?? endereco.numero;
        endereco.referencia= referencia ?? endereco.referencia;
        endereco.descricao= descricao ?? endereco.descricao;
        endereco.coordenadas= (latitude && longitude) ? latitude + ',' + longitude: '';
      }
      else{
        throw new Error('Você não tem permissão para alterar este endereço');
      }
    }
    else{
      throw new Error('Endereço não encontrado');
    }

    // Salvar as alterações no banco de dados
    await endereco.save();
    return endereco;
    
  } catch (error: any) {
    throw error;
  }
}


//deleta o endereço de um cliente
export const deletarEndereco = async (id_endereco: string, id_usuario: number) => {
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