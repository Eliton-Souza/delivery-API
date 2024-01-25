import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

export const enviarMSG= async (numero: string, codigo: string) => {

  try {

    const message = await client.messages.create({
      from: 'whatsapp:+14155238886',
      body: 'Seu código de verificação do Delivery é: ' + codigo,
      to: 'whatsapp:'+ numero,
    });
    
    //console.log(message.sid);
    return message.sid;

  } catch (error: any) {
    throw error;
  }
}