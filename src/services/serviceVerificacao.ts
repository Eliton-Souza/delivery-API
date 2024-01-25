import { VerificacaoTemp } from '../models/VerificacaoTemp';

const geraCodeRandom= async() =>{
  // Gera um código aleatório de 4 dígitos
  const min = 1000; // Menor número de 4 dígitos
  const max = 9999; // Maior número de 4 dígitos
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const geraExpiracao= async()=> {
  const currentTime = new Date();
  const expirationTime = new Date(currentTime.getTime() + 5 * 60000); // Multiplica por 60000 para converter minutos em milissegundos
  return expirationTime;
}

//registra um novo codigo na tabela temporaria
export const registraCodigo= async (numero: string) => {
  
  try {
    const codigoAleatorio = await geraCodeRandom();
    const expirationTime = await geraExpiracao();

    const verificacao = await VerificacaoTemp.create({
      numero,
      codigo: codigoAleatorio,
      expiracao: expirationTime,
    });

    return verificacao;
    
  } catch (error: any) {
    throw error;
  }
}

// Verifica se um número de telefone já está registrado na tabela temporária ou token expirado
export const verificaNumero = async (numero: string) => {

  try {
    const dataAtual = new Date();
  
    const result = await VerificacaoTemp.findOne({
      where: {
        numero: numero
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
            numero: numero
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
export const verificaCode = async (numero: string, codigo: string) => {

  try {
    const dataAtual = new Date();
  
    const result = await VerificacaoTemp.findOne({
      where: {
        numero: numero
      }
    });

    if (!result){
      throw new Error('Numero não encontrado');
    }

    // Se existe um registro e não está expirado
    if (result.expiracao > dataAtual && result.codigo == codigo) {

      await VerificacaoTemp.destroy({
        where: {
          numero: numero
        }
      });
      //deleta o registro e retorna true
      return true;

    } else if(result.expiracao < dataAtual) {

      await VerificacaoTemp.destroy({
        where: {
          numero: numero
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