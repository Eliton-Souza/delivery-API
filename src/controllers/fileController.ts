import { Request, Response } from 'express';
import { uploadAWS } from '../services/serviceAWS';


export const uploadImagem = async (req: Request, res: Response) => {
  try {
    if (req.file) {

      const url= await uploadAWS(req.file.path, req.file.filename);      
      return res.status(200).json({ success: true, imageUrl: url });
        
    } else {
      throw new Error('Arquivo não suportado');
    }
  } catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
};