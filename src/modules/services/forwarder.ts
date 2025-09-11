import axios from 'axios';
import {  Payload } from '../../types/body';

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


  const buildMessage = data?.payload.data?.message as string
 



  const response = await axios.post(url, {message: buildMessage, number: number , payload: data.payload }, { headers, timeout: 10000 });
  console.log('response forwardToExternalService');
  console.log(response.data);
  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
} 





