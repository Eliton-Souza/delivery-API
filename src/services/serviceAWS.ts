import { promisify } from 'util';
import AWS from '../instances/aws_config';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const s3 = new AWS.S3();
const s3Upload = promisify(s3.upload.bind(s3));

export const uploadAWS= async (path: string, fileName: string) => {

  try {
    const fileContent = fs.readFileSync(path);
  
      const params = {
        Bucket: 'purus-delivery',
        Key: fileName,
        Body: fileContent,
        ACL: 'public-read'
      };

      const data = await s3Upload(params);

      fs.unlinkSync(path);
      return data.Location;

  } catch (error: any) {
    fs.unlinkSync(path);
    throw error;
  }
}