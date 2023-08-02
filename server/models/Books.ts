import sequelize from "../db/connection";
import { Model, DataTypes } from "sequelize";

class Book extends Model {
  declare id: number;
  declare title: string;
  declare author: string;
  declare genre: string;
  declare publicationYear: string;
  declare image: string;
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
      },
      publicationYear: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
  },
  {
    sequelize,
  }
);
export default Book;
