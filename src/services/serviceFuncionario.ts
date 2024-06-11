import { Funcionario } from '../models/Funcionario';

//cadastra um novo funcionario
export const criarFuncionario = async (id_loja: number, id_usuario: number, tipo: string, transaction: any) => {

  try {
    const novoFuncionario = await Funcionario.create({
      id_usuario: id_usuario,
      id_loja,
      tipo,
    }, { transaction });

    return novoFuncionario;
   
  } catch (error: any) {
    throw error;
  }
}


//pega os dados basicos de um usuario
export const pegarFuncinario = async (id_funcionario: number) => {

  try {
    const funcionario = await Funcionario.findByPk(id_funcionario, {raw: true});
    
    return funcionario;
    
  } catch (error: any) {
    throw error;
  }
}