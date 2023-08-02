import { User, Book, sequelize } from '.';

import data from './seeds.json';

const buildDB = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(data.User);
  await Book.bulkCreate(data.Book);

};

  buildDB();

export default buildDB;
