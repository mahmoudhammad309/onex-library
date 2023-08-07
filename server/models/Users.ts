import sequelize from "../db/connection";
import { DataTypes, Model } from "sequelize";

const User = sequelize.define("User", {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});

export default User;

// Add this type declaration to fix the TypeScript error
export type UserType = typeof User;
