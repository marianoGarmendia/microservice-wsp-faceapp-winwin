import axios from 'axios';
import { buildConfirmationMessage, Payload } from '../../lib/buildConfirmationMsg';

interface Data {
  payload: Payload;
}

export async function forwardToExternalService(
  data: Data,
  url: string,
  apiKey?: string
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  const number = data.payload.data?.number || '';
 


  const buildMessage = buildConfirmationMessage(data.payload as Payload);

  const response = await axios.post(url, {message: buildMessage, number: number , payload: data.payload }, { headers, timeout: 10000 });
  console.log('response forwardToExternalService');
  console.log(response.data);
  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
} 





