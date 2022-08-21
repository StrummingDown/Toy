import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly password: string;
  @IsString()
  readonly nickname: string;
  @IsString()
  readonly location: string;
  @IsString()
  readonly email: string;
}
