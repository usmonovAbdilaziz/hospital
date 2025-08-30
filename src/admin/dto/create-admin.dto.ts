import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAdminDto {

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;
}
