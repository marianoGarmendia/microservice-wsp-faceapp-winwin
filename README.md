# Microservicio Node.js + TypeScript

Servicio HTTP sencillo que expone un endpoint que recibe un body JSON, lo procesa mínimamente y lo reenvía a un servicio externo. Requiere autenticación por token en el endpoint POST.

## Requisitos
- Node.js 18+

## Configuración
Cree un archivo `.env` en la raíz con las variables:

```
PORT=3000
PUBLIC_URL=http://localhost:3000           # opcional; útil en despliegues
INBOUND_AUTH_TOKEN=supersecreto            # requerido; token para autorizar POST entrante
EXTERNAL_SERVICE_URL=https://httpbin.org/post
EXTERNAL_SERVICE_API_KEY=                  # opcional; token para el servicio externo
```

## Scripts
- `npm run dev`: inicia modo desarrollo con recarga.
- `npm run build`: compila a `dist/`.
- `npm start`: ejecuta compilado.

## Endpoints
- `GET /health`: verificación de estado.
- `POST /process`: recibe JSON, requiere `Authorization: Bearer <token>`, y reenvía al servicio externo.

Ejemplo de request:
```bash
curl -X POST http://localhost:3000/process \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $INBOUND_AUTH_TOKEN" \
  -d '{"hello":"world"}'
```

Node js:

```javascript
async function sendRequest() {
  try {
    const response = await axios.post(
      url,
      { data: {service: "Random service"} }, // body JSON
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    console.log("Respuesta:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}
```

## Estructura
```
src/
  index.ts
  modules/
    config/env.ts
    services/forwarder.ts
```

