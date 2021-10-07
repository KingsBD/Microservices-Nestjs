import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  url: process.env.MONGO_DATABASE_URL,
}));
