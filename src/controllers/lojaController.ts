import { Request, Response } from 'express';
import { dadosUsuario} from '../config/passport';
import * as ServiceLoja from '../services/serviceLoja';
import * as ServiceHorario from '../services/serviceHorario';
import * as ServiceTaxas from '../services/serviceTaxaEntrega';
import * as ServiceFuncionario from '../services/serviceFuncionario';
import { sequelize } from '../instances/mysql';
import { pegarIdLoginUsuario } from '../services/serviceLogin';
import { pegarUsuario } from '../services/serviceUsuario';


declare global {
  namespace Express {
    interface User extends dadosUsuario {}
  }
}



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

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

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

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  const { linkImagem, tipo} = req.body;

  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

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

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  const { nome, contato} = req.body;

  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

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

  const id_funcionario: number | null = req.user?.id_funcionario || null;
  const id_usuario: number | null = req.user?.id_usuario || null;

  const { horarios } = req.body;

  try {
    if(id_funcionario && id_usuario){
      const funcionario= await ServiceFuncionario.pegarFuncinario(id_usuario);

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



/*
//TESTESSSS
export const cadastrarTaxas = async (req: Request, res: Response) => {

  const { id_loja } = req.body;

  try {
    await ServiceHorario.instanciaHorarios(id_loja);
    
    return res.json({success: true });
  } catch (error) {
    return res.json({error: "Erro ao listar lojas"});
  }
}



export const atualizarFuncionário = async (req: Request, res: Response) => {
  const id_funcionario = req.params.id_funcionario;
  const id_gerente: number = req.user?.id_usuario || 0;

  const { tipo } = req.body;

    try {
      const mensagem= await alterarCargoFuncionario(id_funcionario, id_gerente, tipo);
      
      return res.json({ sucesso: mensagem });
    } catch (error:any) {
      return res.json({ error: 'Erro ao atualizar o funcionário'});
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