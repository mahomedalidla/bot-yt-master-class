import BotWhatsapp from '@bot-whatsapp/bot';

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(['hola', 'buenas'])
    .addAnswer('Flow hellow ------- Un gusto tenerte de nuevo ¿Como puedo ayudarte el día de hoy 😀?')



//     import BotWhatsapp from '@bot-whatsapp/bot';

// // Crear flujos para cada opción
// BotWhatsapp.addKeyword('opcion1')
//     .addAnswer('Has seleccionado la opción 1. ¿Cómo puedo ayudarte con eso?');

// BotWhatsapp.addKeyword('opcion2')
//     .addAnswer('Has seleccionado la opción 2. ¿Necesitas más información sobre esto?');

// // Crear flujo principal
// export default BotWhatsapp.addKeyword(['hola', 'buenas'])
//     .addAnswer('Flow hellow ------- Un gusto tenerte de nuevo ¿Como puedo ayudarte el día de hoy 😀?')
//     .addAnswer('Puedes decir "opcion1" para hacer una pregunta o "opcion2" para obtener más información.');