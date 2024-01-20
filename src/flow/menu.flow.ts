import BotWhatsapp from '@bot-whatsapp/bot';
import { generatePaymentLink } from 'src/services/paypal';

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(['mennu', 'menú','menu']).addAnswer('Claro, te comparto el menú', {
    media: 'https://i.imgur.com/0HpzsEm.png',
})
