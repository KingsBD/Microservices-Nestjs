import { registerAs } from '@nestjs/config';

export default registerAs('user', () => ({
  host: process.env.USER_APP_HOST,
  port: process.env.USER_APP_PORT,
}));
