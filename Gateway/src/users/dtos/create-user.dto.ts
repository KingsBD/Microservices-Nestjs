import { ApiTags } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';

@ApiTags()
export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @ValidateIf((value) => value.length > 0)
  @IsOptional()
  @IsEmail()
  secundaryEmail?: string;

  @IsPhoneNumber('US')
  phoneNumber: string;

  @ValidateIf((value) => value.length > 0)
  @IsOptional()
  @IsPhoneNumber('US')
  secundaryPhoneNumber?: string;

  @IsOptional()
  @IsString()
  homeAddress?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
