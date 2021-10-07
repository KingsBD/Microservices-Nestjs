import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorException extends HttpException {
  constructor(
    statusCode: number,
    error: string,
    message: string[] = [],
    httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super({ statusCode, error, message }, httpStatus);
  }
}
