import BotWhatsapp from '@bot-whatsapp/bot';
import { generatePaymentLink } from 'src/services/paypal';

import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', // Reemplaza con tu servidor SMTP
  port: 465, // Usa el puerto correcto para tu servidor
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: 'dev@mahomedalid.com', // Reemplaza con tu correo
    pass: 'Mahomedalid019.' // Reemplaza con tu contraseña
  }
});
let paypalLink;

const handleEmailCapture = async (ctx: any, { state, fallBack }: any) => {
  try {
    const email = ctx.body.toLowerCase();
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return fallBack('Eyy! Bro esto no es un email válido! ¡Ponte serio!');
    }
    await state.update({ email });

    // Llamar a la función directamente, manejando el flujo manualmente
    await generateAndSendPaypalLink(ctx, state); // Elimina la declaración de const paypalLink

    // Configura las opciones de correo
    let mailOptions = {
      from: 'dev@mahomedalid.com',
      to: email,
      subject: 'Tu link de PayPal',
      text: `tu link es el siguiente ${paypalLink}`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        fallBack('Ocurrió un error al enviar el correo electrónico. Por favor, intenta de nuevo.');
      } else {
        console.log('Email enviado: ' + info.response);
        BotWhatsapp.addAnswer('tu link es el siguiente se envió por correo electrónico');
      }
    });

  } catch (error) {
    console.error('Error al procesar el email:', error);
    // Puedes realizar acciones adicionales en caso de error si es necesario
  }
};

const generateAndSendPaypalLink = async (ctx: any, state: any) => {
  const email = state.get('email');
  try {
    paypalLink = await generatePaymentLink('10.00', email);
    
    // Manejar el flujo manualmente aquí
    console.log('...generando link de pago:', paypalLink);
    

    // Puedes realizar acciones adicionales según sea necesario
    
  } catch (error) {
    console.error('Error al generar el enlace de PayPal:', error);
    // Puedes realizar acciones adicionales en caso de error si es necesario
  }
};

export default BotWhatsapp.addKeyword(['paypal'])
  .addAnswer('flow PAYPAL ------ ¿Como es tu email? lo necesito para generar link de', { capture: true },
    handleEmailCapture)
    .addAnswer(`tu link es el siguiente se envion por correo electronico`);