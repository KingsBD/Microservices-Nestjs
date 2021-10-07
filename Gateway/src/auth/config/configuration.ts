import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  host: process.env.AUTH_APP_HOST,
  port: process.env.AUTH_APP_PORT,
}));
