import sequelize from "../db/connection";
import { DataTypes, Model } from "sequelize";

const User = sequelize.define("User", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  fullName: {
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
