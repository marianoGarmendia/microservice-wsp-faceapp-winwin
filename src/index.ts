import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { loadEnv } from './modules/config/env';
import { forwardToExternalService } from './modules/services/forwarder';
import {Payload} from './types/body';
dotenv.config();
const env = loadEnv();

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'wsp-faceapp-ms', time: new Date().toISOString() });
});

// Auth middleware simple por token en Authorization: Bearer <token>
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('authorization') || req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Falta header Authorization' });
  }
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return res.status(401).json({ error: 'Formato de Authorization inválido' });
  }
  if (token !== env.inboundAuthToken) {
    return res.status(401).json({ error: 'Token inválido' });
  }
  next();
}

app.post('/process', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    // eslint-disable-next-line no-console
    console.log('POST /process body:', JSON.stringify(payload));

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Body inválido: se requiere JSON' });
    }

    console.log('payload');
    console.dir(payload, { depth: null });

    if (!payload.data.number) {
      return res.status(400).json({ error: 'Falta el número de teléfono' });
    }

    const processed = {
      receivedAt: payload.data.timestamp || new Date().toISOString(),
      payload: payload as Payload,
    };

    // acá debería hacer la evaluación de la persona y su status

    console.dir(processed, { depth: null });

    const result = await forwardToExternalService(processed, env.externalServiceUrl, env.externalServiceApiKey);
    // TODO:
    // Return id_captacion in response
    res.status(202).json({ forwarded: true, external: result});
  } catch (err) {
    next(err);
  }
});




// Error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = err instanceof Error ? err.message : 'Unknown error';
  res.status(500).json({ error: message });
});

const port = env.port;
app.listen(port, () => {
  const host = process.env.PUBLIC_URL || `http://localhost:${port}`;
  // eslint-disable-next-line no-console
  console.log(`Servidor levantado en: ${host}`);
});


