import { Login } from '../models/Login';
import { VerificacaoTemp } from '../models/VerificacaoTemp';
import { Op } from 'sequelize';

const geraCodeRandom= async() =>{
  // Gera um código aleatório de 4 dígitos
  const min = 1000; // Menor número de 4 dígitos
  const max = 9999; // Maior número de 4 dígitos
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const geraExpiracao= async()=> {
  const currentTime = new Date();
  const expirationTime = new Date(currentTime.getTime() + 3 * 60000); // Multiplica por 60000 para converter minutos em milissegundos
  return expirationTime;
}

//registra um novo codigo na tabela temporaria
export const registraCodigo= async (celular: string) => {
  
  try {
    const codigoAleatorio = await geraCodeRandom();
    const expirationTime = await geraExpiracao();

    const verificacao = await VerificacaoTemp.create({
      celular,
      codigo: codigoAleatorio,
      validado: false,
      expiracao: expirationTime,
    });

    return verificacao;
    
  } catch (error: any) {
    throw error;
  }
}

// Verifica se um número de telefone já está registrado na tabela temporária ou token expirado
export const verificaCelular = async (celular: string) => {

  try {
    const dataAtual = new Date();
      
    const numLogin = await Login.findOne({
      where:{
        celular
      }
    })

    if(numLogin){
      throw new Error('Este número já está cadastrado no sistema');
    }
  
    const result = await VerificacaoTemp.findOne({
      where: {
        celular
      }
    });

    if (result) {
      // Se existe um registro, verifica se ainda está válido
      if (result.expiracao > dataAtual) {
        throw new Error('Aguarde o token expirar para solicitar um novo');
      } else {
        // Se expirou, exclui o registro
        await VerificacaoTemp.destroy({
          where: {
            celular
          }
        });
      }
    }

    return true;

  } catch (error) {
    throw error;
  }
};




// Verifica se um número de telefone já está registrado na tabela temporária ou token expirado
export const verificaCode = async (celular: string, codigo: string) => {

  try {
    const dataAtual = new Date();
  
    const result = await VerificacaoTemp.findOne({
      where: {
       celular
      }
    });

    if (!result){
      throw new Error('WhatsApp não encontrado');
    }

    // Se existe um registro e não está expirado
    if (result.expiracao > dataAtual && result.codigo == codigo) {

      await result.update({ 
        validado: true
      });
      
      return true;

    } else if(result.expiracao < dataAtual) {

      await VerificacaoTemp.destroy({
        where: {
          celular
        }
      });
      throw new Error('Token expirado, tente novamente enviando um novo codigo');
    }
    else{
      throw new Error('Codigo inválido');
    }

  } catch (error) {
    throw error;
  }
};

// Verifica se um número de telefone já está registrado na tabela temporária ou token expirado
export const deletaLoginVerificado = async (celular: string) => {
  try {
    const result = await VerificacaoTemp.findOne({
      where: {
        celular
      }
    });

    if (!result) {
      throw new Error('Registro não encontrado');
    }

    await VerificacaoTemp.destroy({
      where: {
        id: result.id
      }
    });

    if (!result.validado) {
      throw new Error('Seu código não foi validado');
    }

    return true;

  } catch (error) {
    throw error;
  }
};



// Serviço para deletar todos os logins expirados
export const deletarLoginsExpirados = async () => {
  try {
    const dataAtual = new Date();

    // Deleta os registros expirados
    await VerificacaoTemp.destroy({
      where: {
        expiracao: {
          [Op.lt]: dataAtual
        }
      }
    });

    return true;

  } catch (error) {
    throw error;
  }
};
