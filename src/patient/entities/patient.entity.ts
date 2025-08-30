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
import { Gender } from 'src/Role/role';

@Table({ tableName: 'patients' })
export class Patient extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare full_name: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(Gender)),
  })
  declare gender: Gender;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  declare dob: Date;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare address: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare plus_phone: string;

  //bog'lanish
  @ForeignKey(() => Hospital)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare hospital_id: number;

  @BelongsTo(() => Hospital)
  hospital: Hospital;

  @HasMany(() => Appoinment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare appoinment: Appoinment;
}
