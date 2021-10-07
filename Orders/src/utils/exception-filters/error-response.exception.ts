import { RpcException } from '@nestjs/microservices';

export class ErrorException extends RpcException {
  constructor(statusCode: number, error: string, message: string[] = []) {
    super({ statusCode, error, message });
  }
}
