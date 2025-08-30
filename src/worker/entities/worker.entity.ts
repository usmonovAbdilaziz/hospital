import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Appoinment } from 'src/appoinment/entities/appoinment.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { Gender, WorkerRole, WorkerStatus } from 'src/Role/role';

@Table({ tableName: 'workers' })
export class Worker extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare full_name: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(WorkerRole)),
  })
  declare workerRole: WorkerRole;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare speciality: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare phone_number: string;

  @Column({
    allowNull: false,
    type: DataType.DATEONLY,
  })
  declare hired_at: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(WorkerStatus)),
  })
  declare status: WorkerStatus;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(Gender)),
  })
  declare gender: Gender;

  @ForeignKey(() => Hospital)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare hospital_id: number;

  @BelongsTo(() => Hospital)
  declare hospital: Hospital;

  @HasMany(() => Appoinment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare appoinments: Appoinment[];
}
