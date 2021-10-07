import { registerAs } from '@nestjs/config';

export default registerAs('order', () => ({
  host: process.env.ORDER_APP_HOST,
  port: process.env.ORDER_APP_PORT,
}));
