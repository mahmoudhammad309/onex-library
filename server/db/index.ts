import { User, Book } from "../models";
import sequelize from "./connection";

// Define associations
User.hasMany(Book);
Book.belongsTo(User);

export { User, Book, sequelize };
