import { Request, Response } from 'express';
import * as ServiceLoja from '../services/serviceLoja';
import * as ServiceHorario from '../services/serviceHorario';
import * as ServiceTaxas from '../services/serviceTaxaEntrega';
import * as ServiceFuncionario from '../services/serviceFuncionario';
import { sequelize } from '../instances/mysql';
import { pegarIdLoginUsuario } from '../services/serviceLogin';
import { pegarUsuario } from '../services/serviceUsuario';


export const cadastrarLoja = async (req: Request, res: Response) => {

  const transaction = await sequelize.transaction();
  const { nome, tipo,  celular} = req.body;
  
  try {
    const loja = await ServiceLoja.criarLoja(nome, tipo, transaction);
    await ServiceHorario.instanciaHorarios(loja.id_loja, transaction);
    await ServiceTaxas.instanciasTaxa(loja.id_loja, "Boca do Acre", transaction);

    const id_loginNovoFuncionario= await pegarIdLoginUsuario(celular);
    const usuario= await pegarUsuario(id_loginNovoFuncionario);

    if(usuario){
      await ServiceFuncionario.criarFuncionario(loja.id_loja, usuario.id_usuario, "gerente", transaction);
  
      await transaction.commit();
      return res.status(200).json({ success: true, loja: loja });
    }

  }catch (error: any) {
    await transaction.rollback();
    return res.json({success: false, error: error.message});
  }
}



//rota publica, lista os dados de uma loja com base no nome
export const pegarLoja = async (req: Request, res: Response) => {

  const nome_loja = req.params.nome_loja;

  try {
    const loja= await ServiceLoja.pegarDadosLoja(nome_loja);
    
    return res.status(200).json({ success: true, loja: loja });
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}

//rota privada, lista os dados de uma loja com base no id do funcionario que pega o id_loja
export const pegarLojaFuncionario = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;

  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

      if(funcionario){
        const loja= await ServiceLoja.pegarDadosLoja(funcionario.id_loja);
        return res.status(200).json({ success: true, loja: loja });
      }
    }

    throw new Error('Você não tem permissão para acessar os dados desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}



//atualiza as imagens de perfil e capa da loja
export const atualizarImagemPerfilLoja = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;

  const { linkImagem, tipo} = req.body;

  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

      if(funcionario){
        await ServiceLoja.editarPerfilLoja(funcionario.id_loja, linkImagem, tipo);
        return res.status(200).json({ success: true });
      }
    }

    throw new Error('Você não tem permissão para acessar os dados desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}



//rota privada, atualiza nome e contato da loja com base no id do funcionario que pega o id_loja
export const atualizarNomeContato = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;

  const { nome, contato} = req.body;

  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

      if(funcionario){
        await ServiceLoja.editaNomeContato(funcionario.id_loja, nome, contato);
        return res.status(200).json({ success: true });
      }
    }

    throw new Error('Você não tem permissão para alterar os dados desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}

//edita uma lista de horarios
export const editarHorarios = async (req: Request, res: Response) => {

  const id_funcionario: number = req.funcionario.id_funcionario;

  const { horarios } = req.body;

  try {
    if(id_funcionario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_funcionario);

      if(funcionario){
        await ServiceHorario.editarHorarios(horarios);
        return res.json({ success: true });
      }
    }

    throw new Error('Você não tem permissão para alterar os horarios desta loja');
    
  } catch (error: any) {
    return res.json({success: false, error: error.message});
  }
}

  
//ROTA PUBLICA
export const listarLojas = async (req: Request, res: Response) => {

  try {
    const lojas= await ServiceLoja.pegarLojas();
    
    return res.json({success: true, lojas: lojas });
  } catch (error) {
    return res.json({error: "Erro ao listar lojas"});
  }
}