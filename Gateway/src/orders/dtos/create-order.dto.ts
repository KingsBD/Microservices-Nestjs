import { ApiTags } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@ApiTags()
export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsString()
  description: string;
}
