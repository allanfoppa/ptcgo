import { format } from 'winston';

interface ILogMessage {
  type: 'request' | 'response';
  [key: string]: any;
}

export const loggerFormat = () => format.printf(({
  timestamp,
  label,
  level,
  message
}: {
  timestamp: string,
  label: string,
  level: string,
  message: ILogMessage
}) => {
  const logType = message.type === 'request' ? 'REQUEST' : 'RESPONSE';
  delete message.type;
  return `${timestamp} [${label}] ${level} [${logType}]: ${JSON.stringify(message)}`;
});
