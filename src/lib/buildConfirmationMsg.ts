export type Payload = {
    data?: {
      name?: string;
      number?: string;
      message?: string;
      service?: string;
      endpoint?: string;
      id_contacto?: string;
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
    opts: BuildOpts = {} 
  ): string {
    const tz = opts.tz ?? "America/Argentina/Buenos_Aires";
    const date = opts.date ?? new Date();
  
    const fmt = new Intl.DateTimeFormat("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
      hour12: false,
      timeZone: tz,
    });
  
    const name = payload?.data?.name ?? "—";
    const service = payload?.data?.service ?? "—";

    console.log('name');
    console.log(name);
    console.log('service');
    console.log(service);

    const baseMsg =
      payload?.data?.message ??
      `Se ha realizado una solicitud de servicio a nombre ${name}, por favor confirma que fuiste tú.`;
  
    const hora = fmt.format(date);

    const whatsappMessage = {
       text: `${baseMsg}
        Hora de la solicitud: ${hora}
        Servicio solicitado: ${service}
        Nombre del solicitante: ${name}`
        
      ,
        templateButtons: [
          { index: 1, quickReplyButton: { displayText: "✅ Acepto", id: "ACCEPT" } },
          { index: 2, quickReplyButton: { displayText: "❌ Rechazo", id: "REJECT" } },
        ],
      };
  
    return (
  `Se ha realizado una solicitud de servicio a nombre *${name}*, por favor confirma que fuiste tú.

  Hora de la solicitud: *${hora}*
  Servicio solicitado: *${service}*
  Nombre del solicitante: *${name}*
  
  Responde con la opción que corresponda:

  1. ✅ Acepto
  2. ❌ Rechazo
  `
    ).trim();
  }
  