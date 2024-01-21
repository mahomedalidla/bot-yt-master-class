import BotWhatsapp from "@bot-whatsapp/bot";
import { ChatCompletionMessageParam } from "openai/resources";
import { run, runDetermine } from "src/services/openai";
import chatbotFlow from "./chatbot.flow";



/**
 * Un flujo conversacion que es por defecto cunado no se contgiene palabras claves en otros flujos
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
  .addAction(async (ctx, { state, gotoFlow }) => {
    try {
      const history = (state.getMyState()?.history ??
        []) as ChatCompletionMessageParam[];
      const ai = await runDetermine(history);

      console.log(`[QUE QUIERES COMPRAR:`, ai.toLowerCase());

      if (ai.toLowerCase().includes("unknown")) {
        return;
      }

      if (ai.toLowerCase().includes("chatbot")) {
        return gotoFlow(chatbotFlow);
      }

      /**..... */
    } catch (err) {
      console.log(`[ERROR]:`, err);
      return;
    }
  })
  .addAction(async (ctx, { flowDynamic, state }) => {
    try {
      const newHistory = (state.getMyState()?.history ??
        []) as ChatCompletionMessageParam[];
      const name = ctx?.pushName ?? "";

      console.log(`[HISTORY]:`, newHistory);

      newHistory.push({
        role: "user",
        content: ctx.body,
      });

      const largeResponse = await run(name, newHistory);

      const chunks = largeResponse.split(/(?<!\d)\.\s+/g);
      for (const chunk of chunks) {
        await flowDynamic(chunk);
      }

      newHistory.push({
        role: "assistant",
        content: largeResponse,
      });

      await state.update({ history: newHistory });
    } catch (err) {
      console.log(`[ERROR]:`, err);
    }
  });


  // .addAction(async (ctx, { flowDynamic, state }) => {
  //   try {
  //     const newHistory = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[];
  //     const name = ctx?.pushName ?? "";
  
  //     console.log(`[HISTORY]:`, newHistory);
  
  //     newHistory.push({
  //       role: "user",
  //       content: ctx.body,
  //     });
  
  //     // Usar chrono para analizar la fecha y la hora del texto
  //     const parsedDate = chrono.parseDate(ctx.body);
  //     const parsedTime = chrono.parse(ctx.body)[0]?.start.knownValues;
  
  //     console.log(`Fecha: ${parsedDate}, Hora: ${parsedTime?.hour}:${parsedTime?.minute}`);
  
  //     const largeResponse = await run(name, newHistory);
  
  //     const chunks = largeResponse.split(/(?<!\d)\.\s+/g);
  //     for (const chunk of chunks) {
  //       await flowDynamic(chunk);
  //     }
  
  //     newHistory.push({
  //       role: "assistant",
  //       content: largeResponse,
  //     });
  
  //     await state.update({ history: newHistory });
  //   } catch (err) {
  //     console.log(`[ERROR]:`, err);
  //   }
  // });