// import { setCaptacion } from "./kv-memory-ttl";
// import { CaptacionRecord } from "../types/body";




//   // const payload :Payload = {
//   //   task: 'validate_customer',
//   //   endpoint: 'https://t2k92w8f-3003.brs.devtunnels.ms/agents/customer_validation',
//   //   lastMessage: '',
//   //   messageAfterReject: 'Gracias por su respuesta. Puede modificar su solicitud en el siguiente enlace: https://admin.perdm.winwinsaas.com 🔗.  Si lo prefiere, también puede solicitar una llamada para que le asesoremos personalmente 📞.  Por favor indíquenos si desea que le llamemos, y con gusto le contactaremos.',
//   //   messageAfterApprove: '🙌 Muchas gracias por confirmarnos su paquete. Agradecemos su confianza y en breve nos pondremos en contacto con usted para continuar con el proceso.',
//   //   data: {
//   //     name: 'simon lopez',
//   //     number: '56971524620',
//   //     id_captacion: 648,
//   //     timestamp: 1757613930200,
//   //     message: '👋 Hola, le saludamos de Perdm, representante autorizado de izzi. Queremos confirmar con usted que contrató el paquete INTERNET 1000 MEGAS / SKEELO / VIX PREMIUM / MAX BA / APPLE TV+ . ¿Podría confirmarnos que este es el paquete correcto? ✅'
//   //   }
//   // }


  
//   type BuildOpts = {
//     date?: Date;              // si querés inyectar una fecha específica
//     tz?: string;              // timezone; default: America/Argentina/Buenos_Aires
//   };



  
//   export function buildConfirmationMessage(
//     payload: Payload,
//     opts: BuildOpts = {} ,
//     document?: {id:string, types:string[], document?:string, message:string}
//   ): string {
  
//     // TODO: chequear si tiene documents y enviar por cada document un mensaje y guardar el estado
 
//     // setCaptacion(number, data as Omit<CaptacionRecord, "createdAt"|"expiresAt">)

//     const timestamp = payload?.data?.timestamp ?? new Date().toISOString();

    
// const date = new Date(timestamp);


  
  
//     const message = payload?.data?.message ?? "—";
    
    

   
   

   

  

//     return message;
//   }
  