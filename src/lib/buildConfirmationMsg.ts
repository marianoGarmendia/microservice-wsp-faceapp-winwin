import { setCaptacion } from "./kv-memory-ttl";
import { CaptacionRecord } from "../types/body";

export type Payload = {
    data?: {
      name?: string;
      number?: string;
      message?: string;
      action?: 'confirm' | 'add_documents' | string
      task?: 'validate_customer' | 'request_documentation' | string;
      completed?: boolean;
      service?: string;
      endpoint?: string;
      id_captacion?: string;
      documents?: [{id:string, types:string[], document:string, message:string}]
      last_message?: string;
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

  
  type BuildOpts = {
    date?: Date;              // si querés inyectar una fecha específica
    tz?: string;              // timezone; default: America/Argentina/Buenos_Aires
  };



  
  export function buildConfirmationMessage(
    payload: Payload,
    opts: BuildOpts = {} ,
    document?: {id:string, types:string[], document?:string, message:string}
  ): string {
  
    // TODO: chequear si tiene documents y enviar por cada document un mensaje y guardar el estado
    const number = payload?.data?.number ?? "";

    const data = {
      documents: payload?.data?.documents ?? [],
      message: payload?.data?.message ?? "",
      last_message: payload?.data?.message ?? "",
      id_captacion: payload?.data?.id_captacion ?? "",
      endpointConfirm: payload?.data?.endpoint ?? "",
      task: payload?.data?.task ?? "",
    }

    // setCaptacion(number, data as Omit<CaptacionRecord, "createdAt"|"expiresAt">)

    const timestamp = payload?.data?.timestamp ?? new Date().toISOString();

    
const date = new Date(timestamp);

const formatted = date.toLocaleString("es-AR", {
  day: "numeric",
  month: "numeric",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
  
  
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

    return message;
  }
  