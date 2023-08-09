import { Request, Response } from "express";
import { Op } from "sequelize";
import { Book } from "../models";
import CustomError from "../helpers/errorHandler/CustomError";
import { bookSchema } from "../schemes";
import { IBookUpdateData } from "../interfaces";
import { v2 as cloudinary } from "cloudinary";
import environment from "../config/environment";

cloudinary.config({
  cloud_name: environment.cloud_name,
  api_key: environment.api_key,
  api_secret: environment.api_secret,
});

// CategoriesController.ts file
// get All Books
export const getAllBooks = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const books = await Book.findAll({ where: { UserId: userId } });
  res.status(200).json({
    status: 200,
    data: books,
  });
};

// delete book
export const deleteBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.params;

  // Check if the user has the book
  const userHasBook = await Book.findOne({
    where: { id: bookId, UserId: userId },
  });
  if (!userHasBook) {
    throw new CustomError(404, "Book NOT FOUND or User does not have the book");
  }

  await Book.destroy({ where: { id: bookId } });
  res.status(202).json({
    status: 202,
    msg: "Deleted successfully",
  });
};

// create book
export const createBook = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const uploadedFile = req.file;

  if (!uploadedFile) {
    throw new CustomError(400, "No file uploaded");
  }

  const { title, author, genre, publicationYear, description } = req.body;
  // Upload the file to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    uploadedFile.path
  );

  try {
    // Validate the request data against the schema
    await bookSchema({
      title,
      author,
      genre,
      publicationYear,
      description,
      image: uploadedFile.path,
    });

    // Create the book entry in the database
    const createdBook = await Book.create({
      title,
      author,
      genre,
      publicationYear,
      description,
      UserId: userId,
      image: cloudinaryResponse.secure_url,
    });

    res.status(202).json({
      status: 202,
      msg: "Added book successfully",
      data: createdBook,
    });
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      throw new CustomError(400, error.message);
    } else {
      throw new CustomError(400, "An error occurred");
    }
  }
};

// update book
export const updateBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.params;
  const uploadedFile = req.file;

  const { title, author, genre, publicationYear, description } = req.body;

  try {
    // Find the book to be updated
    const bookToUpdate = await Book.findOne({
      where: { id: bookId, UserId: userId },
    });

    if (!bookToUpdate) {
      throw new CustomError(
        404,
        "Book not found or user does not have the book"
      );
    }

    // Prepare the updated data
    const updatedData: IBookUpdateData = {};
    if (title) updatedData.title = title;
    if (author) updatedData.author = author;
    if (genre) updatedData.genre = genre;
    if (publicationYear) updatedData.publicationYear = publicationYear;
    if (description) updatedData.description = description;
    if (uploadedFile) {
      // Upload the file to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(
        uploadedFile.path
      );
      updatedData.image = cloudinaryResponse.secure_url;
    }

    // Update the book entry in the database
    await bookToUpdate.update(updatedData);

    res.status(200).json({
      status: 200,
      msg: "Updated book successfully",
      data: bookToUpdate,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(400, error.message);
    } else {
      // Handle other error cases
      throw new CustomError(400, "An error occurred");
    }
  }
};

// Search books by author or title
export const search = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { keyword } = req.query;

  try {
    // Search books based on author or title
    const books = await Book.findAll({
      where: {
        UserId: userId,
        [Op.or]: [
          { title: { [Op.iLike]: `%${keyword}%` } },
          { author: { [Op.iLike]: `%${keyword}%` } },
        ],
      },
    });

    res.status(200).json({
      status: 200,
      data: books,
    });
  } catch (error) {
    throw new CustomError(400, "An error occurred");
  }
};
