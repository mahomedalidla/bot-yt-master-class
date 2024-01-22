import BotWhatsapp from '@bot-whatsapp/bot';
import paypalFlow from './paypal.flow';
import welcomeFlow from './welcome.flow';

// const handleMenuSelection = (ctx: any, { state, fallBack }: any) => {
//     const selection = ctx.body;
//     switch (selection) {
//       case '1':
//         // Acción para la opción 1
//         fallBack('Has seleccionado la opción 1. que es ir a pago con paypal.');
//         BotWhatsapp.createFlow(
//             [
//                 paypalFlow
//             ]
//         )
//         break;
//       case '2':
//         // Acción para la opción 2
//         fallBack('Has seleccionado la opción 2. Aquí va la acción para la opción 2.');
//         BotWhatsapp.createFlow(
//             [
//                 welcomeFlow
//             ]
//         )
//         break;
//       // Añade más casos para más opciones del menú
//       default:
//         fallBack('Opción no válida. Por favor, selecciona una opción del menú.');
//         break;
//     }
//   };

// /**
//  * Un flujo de conversación que responde a las palabras clave "hola", "buenas", ...
//  */
// export default BotWhatsapp.addKeyword(['hola', 'buenas'])
//   .addAnswer('Flow hello ------- Un gusto tenerte de nuevo ¿Como puedo ayudarte el día de hoy 😀?')
//   .addAnswer('Por favor, selecciona una opción del menú:\n1. Opción 1, paypal\n2. Opción 2 chatea con nuestro asesor', { capture: true }, handleMenuSelection);










 // -------------+-+-+-*_*_*_+-+-++_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
   //import BotWhatsapp from '@bot-whatsapp/bot';

// // Crear flujos para cada opción
// BotWhatsapp.addKeyword('opcion1')
//     .addAnswer('Has seleccionado la opción 1. ¿Cómo puedo ayudarte con eso?');

// BotWhatsapp.addKeyword('opcion2')
//     .addAnswer('Has seleccionado la opción 2. ¿Necesitas más información sobre esto?');

// // Crear flujo principal
 export default BotWhatsapp.addKeyword(['hola', 'buenas'])
     .addAnswer('Flow hellow ------- Un gusto tenerte de nuevo ¿Como puedo ayudarte el día de hoy 😀?')
///     .addAnswer('Puedes decir "opcion1" para hacer una pregunta o "opcion2" para obtener más información.');