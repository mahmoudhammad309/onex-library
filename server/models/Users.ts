import sequelize from "../db/connection";
import { Model, DataTypes } from "sequelize";

class User extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare username: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
);
export default User;
