import { ApiTags, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

import { CreateOrderDto } from './create-order.dto';

@ApiTags()
export class OrderDTO extends PartialType(CreateOrderDto) {
  @IsString()
  @IsOptional()
  id?: string;
}
