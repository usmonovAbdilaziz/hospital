import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Appoinment } from 'src/appoinment/entities/appoinment.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Worker } from 'src/worker/entities/worker.entity';

@Table({ tableName: 'hospitals' })
export class Hospital extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  declare hospital_name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare address: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  declare phone_number: string;

  @HasMany(() => Patient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare patients: Patient[];

  @HasMany(() => Worker, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare workers: Worker[];
  @HasMany(() => Appoinment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare appoinments: Appoinment[];
}
