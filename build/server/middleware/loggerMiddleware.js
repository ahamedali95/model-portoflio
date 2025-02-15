import morgan from 'morgan';
import { Logger } from '../config';
const stream = {
  write: message => Logger.http(message)
};
const skip = () => {
  const env = process.env.NODE_ENV || 'dev';
  return env !== 'dev';
};
const morganMiddleware = morgan(':method :url :status :response-time ms', {
  stream,
  skip
});
export default morganMiddleware;