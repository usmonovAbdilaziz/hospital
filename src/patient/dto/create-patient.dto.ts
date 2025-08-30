import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Gender } from 'src/Role/role';

export class CreatePatientDto {
  @IsNumber()
  @IsNotEmpty()
  hospital_id: number;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  plus_phone: string;
}
