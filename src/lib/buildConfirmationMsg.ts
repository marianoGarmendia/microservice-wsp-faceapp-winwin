export type Payload = {
    data?: {
      name?: string;
      number?: string;
      message?: string;
      action?: 'confirm' | 'add_documents' | string
      service?: string;
      endpoint?: string;
      id_captacion?: string;
      timestamp?: string;
      strategy?: {
        maxAttempts?: number;
        attemptDelay?: number;
        attemptTimeout?: number;
        attemptMaxDelay?: number;
        attemptMinDelay?: number;
      };
    };
  };


//   {
//     receivedAt: '2025-09-05T17:38:04.517Z',
//     payload: {
//       data: {
//         message: 'Se ha realizado una solicitud de servicio a nombre Simon Lopez, por favor confirma que fuiste tú.',
//         service: 'suscripción',
//         endpoint: 'https://api.dartmolins.winwinsaas.com/agents/customer_validation',
//         name: 'Simon Lopez Salinas',
//         number: 56971524620,
//         id_captacion: 404
//       }
//     }
//   }
  
  type BuildOpts = {
    date?: Date;              // si querés inyectar una fecha específica
    tz?: string;              // timezone; default: America/Argentina/Buenos_Aires
  };
  
  export function buildConfirmationMessage(
    payload: Payload,
    opts: BuildOpts = {} 
  ): string {
    // const tz = opts.tz ?? "America/Argentina/Buenos_Aires";
    // const date = opts.date ?? new Date();

    const timestamp = payload?.data?.timestamp ?? new Date().toISOString();

    
const date = new Date(timestamp);

const formatted = date.toLocaleString("es-AR", {
  day: "numeric",
  month: "numeric",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
  
    // const fmt = new Intl.DateTimeFormat("es-AR", {
    //   dateStyle: "short",
    //   timeStyle: "short",
    //   hour12: false,
    //   timeZone: tz,
    // });
  
    const name = payload?.data?.name ?? "—";
    const service = payload?.data?.service ?? "—";
    const message = payload?.data?.message ?? "—";
    
    const action = payload?.data?.action ?? "—";

    console.log('name');
    console.log(name);
    console.log('service');
    console.log(service);
    console.log('formatted');
    console.log(formatted);

    // const baseMsg =
    //   payload?.data?.message ??
    //   `Se ha realizado una solicitud de servicio a nombre ${name}, por favor confirma que fuiste tú.`;
  
    // const hora = fmt.format(date);

    // const whatsappMessage = {
    //    text: `${baseMsg}
    //     Hora de la solicitud: ${hora}
    //     Servicio solicitado: ${service}
    //     Nombre del solicitante: ${name}`
        
    //   ,
    //     templateButtons: [
    //       { index: 1, quickReplyButton: { displayText: "✅ Acepto", id: "ACCEPT" } },
    //       { index: 2, quickReplyButton: { displayText: "❌ Rechazo", id: "REJECT" } },
    //     ],
    //   };

    const confirmMessage =  `Se ha realizado una solicitud de servicio a nombre *${name}*, por favor confirma que fuiste tú.

    Hora de la solicitud: *${formatted}*
    Servicio solicitado: *${service}*
    Nombre del solicitante: *${name}*
    
    Responde con la opción que corresponda:
  
    1. ✅ Acepto 
    2. ❌ Rechazo 
    `.trim();

    const addDocumentsMessage =  message;

    const whatsappMessage = action === 'confirm'  ? confirmMessage : action === 'add_documents' ? addDocumentsMessage : message;

    
  
    return whatsappMessage;
  }
  