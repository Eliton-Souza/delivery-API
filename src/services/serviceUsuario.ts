import { Usuario } from '../models/Usuario';
import { palavraPadronizado } from './helper';


//cadastra um novo usuario, seja cliente ou cargo de loja
export const criarUsuario = async (nome: string, sobrenome: string, nascimento: Date, genero: string, id_login: number, avatar: string, transaction: any) => {

  const nomePadronizado = palavraPadronizado(nome);
  const sobrenomePadronizado = palavraPadronizado(sobrenome);

  try {
    const usuario = await Usuario.create({
      nome: nomePadronizado,
      sobrenome: sobrenomePadronizado,
      nascimento,
      genero,
      id_login,
      avatar,
    }, { transaction });

    return usuario;
    
  } catch (error: any) {
    throw error;
  }
}


//pega os dados basicos de um usuario
export const pegarUsuario = async (id_login: number) => {

  try {
    const usuario = await Usuario.findOne({
      where: {
        id_login
      },
      attributes: ['id_usuario', 'nome', 'sobrenome', 'avatar'],
      raw: true
  });
    
    return usuario;
    
  } catch (error: any) {
    throw error;
  }
}


/*
//lista todos os funcionarios de uma loja especifica
export const pegarFuncionarios = async (id_loja: string) => {

  try {
    const funcionarios = await Usuario.findAll({
      where: {
        id_loja
      },
      attributes: { 
        exclude: ['id_login'] 
      },
      raw: true
  });
  
    const funcionariosFormatados = funcionarios.map((funcionario: any) => {
      return {
        id_funcionario: funcionario.id_funcionario,
        nome: funcionario.nome,
        sobrenome: funcionario.sobrenome,
        nascimento: funcionario.nascimento,
        genero: funcionario.genero,
        tipo: funcionario.tipo,
      };
    });
    
    return funcionariosFormatados;
    
  } catch (error: any) {
    throw error;
  }
}

//pega os dados basicos de um usuario
export const pegar1Funcionario = async (id_usuario: number) => {

  try {
    const funcionario = await Usuario.findByPk(id_usuario, {
      attributes: ['nome', 'sobrenome', 'id_loja', 'avatar'],
      raw: true
    });

    if (!funcionario || !funcionario.id_loja) {
      throw new Error('Funcionário não encontrado');
    }
    
    return funcionario;
    
  } catch (error: any) {
    throw error;
  }
}




//altera o cargo do funcinario na loja ou remove do quadro de funcionários
export const alterarCargoFuncionario = async (id_funcionario: string, id_gerente: number, cargo: string) => {

  try {
    const funcionario = await Usuario.findByPk(id_funcionario);
    const gerente = await Usuario.findByPk(id_gerente);
    let mensagem: string;

    if (funcionario && gerente) {

      if(funcionario.id_loja == gerente.id_loja){

        funcionario.tipo= cargo;
        mensagem= 'Cargo do funcionário atualizado com sucesso';

        if(cargo == 'cliente'){
          funcionario.id_loja= null;
          mensagem= 'Funcionário removido da equipe';
        }
      }
      else{
        throw new Error('Lojas diferentes');
      }

    }
    else{
      throw new Error('Funcionário ou gerente não encontrado');
    }

    // Salvar as alterações no banco de dados
    await funcionario.save();
    return mensagem;
    
  } catch (error: any) {
    throw error;
  }
}*/