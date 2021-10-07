import { ApiTags, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

@ApiTags()
export class UserDTO extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  id?: string;
}
