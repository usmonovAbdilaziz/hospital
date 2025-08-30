import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { RoleAdmin } from 'src/Role/role';

@Table({ tableName: 'admins' })
export class Admin extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare full_name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  declare username: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  declare phone_number: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(RoleAdmin)),
    defaultValue: RoleAdmin.ADMIN,
  })
  declare role: RoleAdmin;
}
