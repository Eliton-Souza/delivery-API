import { Response } from 'express';
import { Pessoa, PessoaInstace } from '../models/Pessoa/Pessoa';
import { AlunoInstace } from '../models/Pessoa/Aluno';
import { LiderInstace } from '../models/Pessoa/Lider';
import { ResponsavelInstace, } from '../models/Pessoa/Responsavel';
import { Usuario } from '../models/Usuario';


//padroniza o nome dos usuarios
const palavraPadronizado = (nome: string) => {
  return nome
  .split(' ')
  .map((palavra) => {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
  })
  .join(' ');
}

//cadastra um novo usuario, seja cliente ou cargo de loja
export const criarUsuario = async (nome: string, sobrenome: string, nascimento: Date, genero: string, id_login: number, tipo: string, id_loja: number, transaction: any) => {

  const nomePadronizado = palavraPadronizado(nome);
  const sobrenomePadronizado = palavraPadronizado(sobrenome);

  try {
    const usuario = await Usuario.create({
      nome: nomePadronizado,
      sobrenome: sobrenomePadronizado,
      nascimento,
      genero,
      id_login,
      tipo,
      id_loja: tipo!== 'cliente'? id_loja : null,
    }, { transaction });

    return usuario;
    
  } catch (error: any) {
    throw error;
  }
}



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
}











/*
//excluir acesso do funcinario
export const excluirFuncionario = async (id_funcionario: string, id_gerente: number) => {

  try {
    const funcionario = await Usuario.findByPk(id_funcionario);
    const gerente = await Usuario.findByPk(id_gerente);

    if (funcionario && gerente) {
      if(funcionario.id_loja == gerente.id_loja){
        await Usuario.destroy({where:{id_usuario:id_funcionario}});
        return "Funcionário excluído com sucesso";
      }
      else{
        throw new Error('Lojas diferentes');
      }
    }
    else{
      throw new Error('Funcionário ou gerente não encontrado');
    }    
  } catch (error: any) {
    throw error;
  }
}

*/







export const atualizarPessoa = (pessoa: PessoaInstace, nome: string, sobrenome: string, genero: string, nascimento: Date) => {

  const nomePadronizado = palavraPadronizado(nome);
  const sobrenomePadronizado = palavraPadronizado(sobrenome);
  
  try {
    pessoa.nome = nome? nomePadronizado : pessoa.nome;
    pessoa.sobrenome = sobrenome? sobrenomePadronizado : pessoa.sobrenome;
    pessoa.genero = genero ?? pessoa.genero;
    pessoa.nascimento = nascimento?? null;

  } catch (error: any) {
    throw error;
  }
};


//ALTERAÇÕES DE UPDATE NO BANCO
type tipoPessoa= AlunoInstace | ResponsavelInstace | LiderInstace | PessoaInstace;
async function salvarObjeto(objeto: tipoPessoa, res: Response) {
  try {
    await objeto.save();
  } catch (error: any) {
    throw error;
  }
}

export const salvarPessoa = async (obj1: tipoPessoa, obj2: tipoPessoa, res: Response) => {
  await salvarObjeto(obj1, res);
  await salvarObjeto(obj2, res);
};