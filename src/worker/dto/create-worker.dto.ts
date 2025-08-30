import { IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { Gender, WorkerRole, WorkerStatus } from "src/Role/role";

export class CreateWorkerDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsNumber()
  @IsNotEmpty()
  hospital_id:number

  @IsEnum(WorkerRole)
  @IsNotEmpty()
  workerRole: WorkerRole;

  @IsString()
  @IsNotEmpty()
  speciality: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  hired_at: string;

  @IsEnum(WorkerStatus)
  @IsNotEmpty()
  status: WorkerStatus;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;
}
