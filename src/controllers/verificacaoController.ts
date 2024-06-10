import { Request, Response } from 'express';
import { deletarLoginsExpirados, registraCodigo, verificaCelular, verificaCode } from '../services/serviceVerificacao';
import { enviarMSG } from '../services/serviceTwilio';
import { formataNumero } from './helper';


//faz o envio de um novo token ou manda aguardar
export const validaCelular = async (req: Request, res: Response) => {

  const { celular } = req.body;
  const numeroFormatado = formataNumero(celular);

  try {
    await verificaCelular(celular);                         // Verifica se um número de telefone já está registrado na tabela temporária ou token expirado
    const registro = await registraCodigo(celular);        //registra um novo codigo na tabela temporaria
    await enviarMSG(numeroFormatado, registro.codigo);    //envia mensagem de validação

    return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso' });
  } catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
};




//faz a validação do codigo q o usuario forneceu
export const validaCodigo = async (req: Request, res: Response) => {

  const { celular, codigo } = req.body;

  try {
   
    await verificaCode(celular, codigo);
  
    return res.status(200).json({ success: true, message: 'Código validado com sucesso!' });
  } catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
};



//faz a validação do codigo q o usuario forneceu
export const deletarExpirados = async (req: Request, res: Response) => {

  try {
   
    await deletarLoginsExpirados();
  
    return res.status(200).json({ success: true, message: 'Logins expirados foram deletados com sucesso' });
  } catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
};