import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'auth' })
export class Auth extends Model {

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
}
