import { Loja } from '../models/Loja';


//cadastra uma nova loja
export const criarLoja = async (nome: string, entrega: string, funcionamento: Record<string, any>, produtos: Record<string, any>, tipo: string) => {

  try {
    const loja = await Loja.create({
      nome,
      entrega,
      funcionamento,
      produtos,
      bloqueado: false,
      aberto: false,
      nota: 0,
      tipo
    });

    return loja;
    
  } catch (error: any) {
    throw error;
  }
}








