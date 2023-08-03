import sequelize from "../db/connection";
import { Model, DataTypes } from "sequelize";

class Book extends Model {
  declare id: number;
  declare title: string;
  declare author: string;
  declare genre: string;
  declare publicationYear: string;
  declare image: string;
  declare UserId : number;
}

Book.init(
  {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false,

      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,

      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
  {
    sequelize,
  }
);
export default Book;
