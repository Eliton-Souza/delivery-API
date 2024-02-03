import { Request, Response } from 'express';
import { unlink } from 'fs/promises';


//faz o upload de uma imagem
export const uploadImagem = async (req: Request, res: Response) => { 
  
  try {
    if(req.file){
      
      
      await unlink(req.file.path);
      
      return res.status(200).json({ success: true, message: req.file });     
    }

    throw new Error('Arquivo não suportado');
    } catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
};