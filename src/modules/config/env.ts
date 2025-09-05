export type AppEnv = {
  port: number;
  externalServiceUrl: string;
  externalServiceApiKey: string | undefined;
  inboundAuthToken: string;
};

export function loadEnv(): AppEnv {
  const portRaw = process.env.PORT ?? '3000';
  const port = Number(portRaw);
  if (Number.isNaN(port)) {
    throw new Error(`PORT inválido: ${portRaw}`);
  }

  const externalServiceUrl = process.env.EXTERNAL_SERVICE_URL ?? '';
  if (!externalServiceUrl) {
    throw new Error('EXTERNAL_SERVICE_URL es requerido');
  }

  const externalServiceApiKey = process.env.EXTERNAL_SERVICE_API_KEY;
  const inboundAuthToken = process.env.INBOUND_AUTH_TOKEN ?? '';
  if (!inboundAuthToken) {
    throw new Error('INBOUND_AUTH_TOKEN es requerido');
  }

  return { port, externalServiceUrl, externalServiceApiKey, inboundAuthToken };
}


