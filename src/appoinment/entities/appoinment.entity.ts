import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { AppointmentStatus, RoleAppoinment, ScheduleStatus } from 'src/Role/role';
import { Worker } from 'src/worker/entities/worker.entity';

@Table({ tableName: 'appoinments' })
export class Appoinment extends Model {
  @Column({
    allowNull: false,
    type: DataType.DATEONLY,
  })
  declare schedule_start: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(ScheduleStatus)),
    defaultValue:ScheduleStatus.PENDING
  })
  declare schedule_end: ScheduleStatus;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(AppointmentStatus)),
  })
  declare status: AppointmentStatus;
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare reason: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(RoleAppoinment)),
  })
  declare created_by: RoleAppoinment;

  //bog'lanish
  @ForeignKey(() => Hospital)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare hospital_id: number;

  @BelongsTo(() => Hospital)
  hospital: Hospital;

  @ForeignKey(() => Patient)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ForeignKey(() => Worker)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare worker_id: number;

  @BelongsTo(() => Worker)
  worker: Worker;
}
