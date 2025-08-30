import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AppointmentStatus, RoleAppoinment } from "src/Role/role";

export class CreateAppoinmentDto {
  @IsNumber()
  @IsNotEmpty()
  hospital_id: number;

  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @IsNumber()
  @IsNotEmpty()
  worker_id: number;

  @IsString()
  @IsNotEmpty()
  schedule_start: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsEnum(AppointmentStatus)
  @IsNotEmpty()
  status: AppointmentStatus;

  @IsEnum(RoleAppoinment)
  @IsNotEmpty()
  created_by: RoleAppoinment;
}
