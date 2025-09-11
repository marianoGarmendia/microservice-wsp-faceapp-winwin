import axios from 'axios';

const payload = {
   
    number: "56971524620",
    payload: {
      data: {
        message: 'Se ha realizado una solicitud de servicio a nombre *Simon Lopez*, por favor confirma que fuiste tú.\n' +
        '\n' +
        '  Hora de la solicitud: *5/9/25, 08:08 p. m.*\n' +
        '  Servicio solicitado: *suscripción*\n' +
        '  Nombre del solicitante: *Simon Lopez*\n' +
        '  \n' +
        '  Responde con la opción que corresponda:\n' +
        '\n' +
        '  1. ✅ Acepto\n' +
        '  2. ❌ Rechazo',
        service: 'suscripción',
        endpoint: 'https://api.dartmolins.winwinsaas.com/agents/customer_validation',
        name: 'Simon Lopez',
        number: "56971524620",
        id_captacion: 411,
        timestamp: 1757102923161
      }
    }
  }


const test = async () => {

    const response = await axios.post('http://localhost:5000/v1/messages', {message: payload.payload.data.message, number: payload.number , payload: payload.payload}, { headers: { 'Content-Type': 'application/json' }, timeout: 10000 });
    console.log(response.data);

}

// test();

const sendMessage = async (message: string, number: string) => {
    const response = await fetch(
      "http://localhost:5000/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           message,
          number,
         
        }),
      }
    );
  };
  
//   sendMessage("Ping", "56971524620");







