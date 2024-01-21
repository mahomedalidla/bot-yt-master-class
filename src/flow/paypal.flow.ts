import BotWhatsapp from '@bot-whatsapp/bot';
import { generatePaymentLink } from 'src/services/paypal';
import { sendMail } from 'src/mailService';// Asegúrate de usar la ruta correcta al archivo mailService.ts

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
    await generateAndSendPaypalLink(ctx, state);

    // Enviar el correo
    await sendMail(email, 'Tu link de PayPal', `tu link es el siguiente ${paypalLink}`);

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
  .addAnswer('flow PAYPAL ------ ¿Como es tu email? lo necesito para generar link de pago', { capture: true },
    handleEmailCapture)
    .addAnswer(`tu link es el siguiente se envion por correo electronico`);