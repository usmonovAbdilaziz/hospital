import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateHospitalDto {
    
  @IsString()
  @IsNotEmpty()
  hospital_name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;
}
