import { Request, Response } from 'express';
import { uploadAWS } from '../services/serviceAWS';
import axios from 'axios';


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


export const pegarImagem = async (req: Request, res: Response) => {

  const link = decodeURIComponent(req.params.link);

  try {
   
    if (!link) {
      throw new Error('Link não fornecido');
    }

    const response = await axios.get(link as string, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];
    res.setHeader('Content-Type', contentType);
    
    return res.json({ success: true, imagem: response.data });
    
  } catch (error: any) {
    return res.json({ success: false, error: error.message });
  }
};

