import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly checkPassword: string;

  @IsString()
  readonly nickname: string;
  // @IsString()
  // readonly location: string;
  @IsString()
  readonly email: string;
}
