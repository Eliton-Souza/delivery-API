import { Loja } from '../models/Loja';
import { funcionamentoInicial } from './helper';


//cadastra uma nova loja
export const criarLoja = async (nome: string, tipo: string) => {

  try {
    const loja = await Loja.create({
      nome,
      entrega: 0,
      funcionamento: funcionamentoInicial(),
      produtos: {},
      bloqueado: true,
      aberto: false,
      nota: null,
      tipo
    });

    return loja;
    
  } catch (error: any) {
    throw error;
  }
}








