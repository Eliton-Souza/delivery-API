import { Request, Response } from 'express';
import { sequelize } from '../instances/mysql';
import { dadosUsuario, gerarPayload, gerarToken } from '../config/passport';
import { fazerLogin, gerarLogin } from '../services/serviceLogin';
import { deletaLoginVerificado } from '../services/serviceVerificacao';
import {
  criarUsuario,
  pegarUsuario}
from '../services/serviceUsuario';


declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}

//MELHORAR ESSE TIPO DE USUARIO E RESTRINGIR ACESSO APENAS DEPOIS DE VALIDAR CONTATO
export const cadastrarUsuario = async (req: Request, res: Response) => {

  const transaction = await sequelize.transaction();
  const { nome, sobrenome, genero, nascimento, email, celular, senha, avatar} = req.body;

  try {
    await deletaLoginVerificado(celular);
    const id_login= await gerarLogin(email, celular, senha, transaction);
    const usuario = await criarUsuario(nome, sobrenome, nascimento, genero, id_login, avatar, transaction);
    await transaction.commit();

    const payload= gerarPayload(usuario.id_usuario, usuario.nome, usuario.sobrenome, usuario.avatar);
    const token= gerarToken(payload);
    return res.status(200).json({ success: true, token: token });
  
  }catch (error: any) {
    await transaction.rollback();
    return res.json({ success: false, error: error.message });
  }
}


//FAZER LOGIN
export const login = async (req: Request, res: Response) => {

  const { login, senha } = req.body;

  try {
    
   const id_login= await fazerLogin(login, senha);
   const usuario= await pegarUsuario(id_login);

  if(usuario){
    const payload= gerarPayload(usuario.id_usuario, usuario.nome, usuario.sobrenome, usuario.avatar);
    const token = gerarToken(payload);

    return res.status(200).json({ success: true, token: token });
  }
   
  throw new Error('Usuario não encontrado'); 
   
   
  } catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
};





  /*

export const listarFuncionarios = async (req: Request, res: Response) => {

  const id_loja = req.params.id_loja;

  try {
    const funcionarios= await pegarFuncionarios(id_loja);
    
    return res.status(200).json({ success: true, funcionarios: funcionarios });
  } catch (error: any) {
    return res.json({success: false, error: "Erro ao encontrar funcionarios"});
  }
}


export const atualizarFuncionário = async (req: Request, res: Response) => {
  const id_funcionario = req.params.id_funcionario;
  const id_gerente: number = req.user?.id_usuario || 0;

  const { tipo } = req.body;

    try {
      const mensagem= await alterarCargoFuncionario(id_funcionario, id_gerente, tipo);
      
      return res.status(200).json({ success: true, message: mensagem });
      
    } catch (error:any) {
      return res.json({ success: false, error: error.message });
    }  
};



*/



  
/*
export const deletarFuncioario = async (req: Request, res: Response) => {

  const id_funcionario= req.params.id_funcionario;
  const id_gerente: number = req.user?.id_lider || 0;   //ATUALIZAR PRA ID_USUARIO
 
  try {
  
    // Recuperar dados do banco
    const funcionario = await Usuario.findByPk(id_funcionario);
    const gerente = await Usuario.findByPk(id_gerente);

    if (funcionario && gerente) {
      if(funcionario.id_loja == gerente.id_loja){
        await Usuario.destroy({where:{id_usuario:id_funcionario}});
        return res.json({sucesso: "Funcionário excluído com sucesso"});
      }
      else{
        return res.json({ error: 'Lojas diferentes' });
      }
    }
    else{
      return res.json({ error: 'Funcionário ou gerente não encontrado' });
    }    
  } catch (error) {
    return res.json({ error: 'Erro ao excluir Lider'});
  }
};




export const meusDadosLider = async (req: Request, res: Response) => {

  const id = req.user?.id_usuario;

  try {
    const liderResponse = await Lider.findByPk(id, {
      include: [
        {
          model: Pessoa,
          attributes: { 
            exclude: ['id_pessoa']
          }
        },
        {
          model: Clube
        }
      ],
      attributes: { 
          exclude: ['id_pessoa', 'senha'] 
      },
      raw: true
    });

    interface liderFormatado {
      id_lider: number;
      login: string;

      nome: string;
      sobrenome: string;
      genero: string;
      nascimento: string;

      clube: string;
      id_clube: number;
    }

    const lider: any= liderResponse;

    const liderFormatado: liderFormatado  = {
      id_lider: lider.id_lider,
      login: lider.login,
     
      nome: lider['Pessoa.nome'],
      sobrenome: lider['Pessoa.sobrenome'],
      genero: lider['Pessoa.genero'],
      nascimento: lider['Pessoa.nascimento'],

      id_clube: lider.id_clube,
      clube: lider['Clube.nome'],
    };
    
    return res.json({ lider: liderFormatado });
    
  } catch (error) {
    res.json({error: "Líder não encontrado"});
  }
}



export const pegarLider = async (req: Request, res: Response) => {

  let id= req.params.id;

  try {
    const liderResponse = await Lider.findByPk(id, {
      include: [
        {
          model: Pessoa,
          attributes: { 
            exclude: ['id_pessoa']
          }
        },
        {
          model: Clube
        }
      ],
      attributes: { 
          exclude: ['id_pessoa', 'senha'] 
      },
      raw: true
    });

    interface liderFormatado {
      id_lider: number;
      login: string;

      nome: string;
      sobrenome: string;
      genero: string;
      nascimento: string;

      clube: string;
      id_clube: number;
    }

    const lider: any= liderResponse;

    const liderFormatado: liderFormatado  = {
      id_lider: lider.id_lider,
      login: lider.login,
     
      nome: lider['Pessoa.nome'],
      sobrenome: lider['Pessoa.sobrenome'],
      genero: lider['Pessoa.genero'],
      nascimento: lider['Pessoa.nascimento'],

      id_clube: lider.id_clube,
      clube: lider['Clube.nome'],
    };
    
    return res.json({ lider: liderFormatado });
    
  } catch (error) {
    res.json({error: "Líder não encontrado"});
  }
}

const updateLiderFull = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  try {
    const { nome, sobrenome, genero, nascimento, id_clube, login, senha } = req.body;

    // Recuperar dados do lider do banco
    const lider = await Lider.findByPk(id);
    if (lider) {
      lider.id_clube= id_clube ?? lider.id_clube,
      lider.login= login ?? lider.login,
      lider.senha= senha? await bcrypt.hash(senha, 10) : lider.senha
    }
    else{
      return res.json({ error: 'Lider não encontrado' });
    }

    // Recuperar dados da pessoa lider do banco
    const pessoaLider = await Pessoa.findByPk(lider.id_pessoa);
    if (pessoaLider) {
      atualizarPessoa(pessoaLider, nome, sobrenome, genero, nascimento);
    }
    else{
      return res.json({ error: 'Lider não encontrado' });
    }

    // Salvar as alterações no banco de dados
    await salvarPessoa(lider, pessoaLider, res);
    
    return res.json({ lider: lider.id_lider });
  } catch (error:any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const str = error.errors[0].value;
      const novaStr = str.replace(/-/g, ' ');
    
      return res.json({error:  novaStr + ' já está cadastrado(a) no sistema'});
    }
    return res.json({ error: 'Erro ao atualizar o lider'});
  }
};

export const alterarAcesso = async (req: Request, res: Response) => {
  const id = req.user?.id_lider;
  
  try {
    const { login, senha, novoLogin, novaSenha } = req.body;

    // Recuperar dados do lider do banco
    const lider = await Lider.findOne({ where: { login } });
    if (!lider) {
      return res.json({ error: "Login ou senha incorretos" });
    }

    const match = await bcrypt.compare(senha, lider.senha);
    if (!match) {
      return res.json({ error: "Login ou senha incorretos" });
    }
   
    lider.login= novoLogin ?? lider.login,
    lider.senha= novaSenha? await bcrypt.hash(novaSenha, 10) : lider.senha
  
    // Salvar as alterações no banco de dados
    await lider.save();
    
    return res.json({ lider: id });
  } catch (error:any) {
    return res.json({ error: 'Erro ao atualizar o lider'});
  }
};

export const atualizarPerfilLider = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  try {
    const { nome, sobrenome, genero, nascimento} = req.body;

    // Recuperar dados do lider do banco
    const lider = await Lider.findByPk(id);
    if (!lider) {
      return res.json({ error: 'Lider não encontrado' });
    }

    // Recuperar dados da pessoa lider do banco
    const pessoaLider = await Pessoa.findByPk(lider.id_pessoa);
    if (pessoaLider) {
      atualizarPessoa(pessoaLider, nome, sobrenome, genero, nascimento);
    }
    else{
      return res.json({ error: 'Lider não encontrado' });
    }

    // Salvar as alterações no banco de dados
    await pessoaLider.save();
    
    return res.json({ lider: lider.id_lider });
  } catch (error:any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const str = error.errors[0].value;
      const novaStr = str.replace(/-/g, ' ');
    
      return res.json({error:  novaStr + ' já está cadastrado(a) no sistema'});
    }
    return res.json({ error: 'Erro ao atualizar o lider'});
  }
};


export const atualizarClubeLider = async (req: Request, res: Response) => {
  const id = req.params.id;
  const id_clube_secretario = req.user?.id_clube;
  const id_lider = req.user?.id_lider;

  if(id_clube_secretario==8){

    if(id !== id_lider?.toString()){
      try {
        const { id_clube } = req.body;
  
        // Recuperar dados do lider do banco
        const lider = await Lider.findByPk(id);
  
        if (lider) {
          lider.id_clube= id_clube ?? lider.id_clube;
        }
        else{
          return res.json({ error: 'Lider não encontrado' });
        }
  
        // Salvar as alterações no banco de dados
        await lider.save();
        
        return res.json({ lider: lider.id_lider });
      } catch (error:any) {
        return res.json({ error: 'Erro ao atualizar o lider'});
      }
    }else{
      return res.json({ error: 'Você não pode alterar seu próprio clube'});
    }    
  }
  else{
    return res.json({ error: 'Você não tem autorização' });
  }
};
  

export const deletarLider = async (req: Request, res: Response) => {

  const id_lider= req.params.id;
 
  try {
    const lider= await Lider.findByPk(id_lider);

    if(lider){
      const id_pessoa= lider.id_pessoa;
      
      await Pessoa.destroy({where:{id_pessoa}});
      await Lider.destroy({where:{id_lider}});

      return res.json({sucesso: "Lider excluído com sucesso"});
    }
    else{
      return res.json({ error: 'Lider não encontrado'});
    }
    
  } catch (error) {
    return res.json({ error: 'Erro ao excluir Lider'});
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { login, senha } = req.body;

    const lider = await Lider.findOne({ where: { login } });
    if (!lider) {
      return res.json({ error: "Login ou senha incorretos" });
    }

    const match = await bcrypt.compare(senha, lider.senha);
    if (!match) {
      return res.json({ error: "Login ou senha incorretos" });
    }

    const pessoa = await Pessoa.findByPk(lider.id_pessoa);
    if (!pessoa) {
      return res.json({ error: "Pessoa não encontrada" });
    }

    const payload = gerarPayload(
      lider.id_lider,
      pessoa.nome + " " + pessoa.sobrenome,
      lider.id_clube
    );
    const token = gerarToken(payload);

    return res.json({ token });
  } catch (error: any) {
    console.log(error);
    return res.json({ error: "Erro ao fazer o login" });
  }
};*/