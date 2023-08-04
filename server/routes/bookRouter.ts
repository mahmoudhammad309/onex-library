import { Router } from "express";
import multer from "multer";

import {
  getAllBooks,
  deleteBook,
  createBook,
  updateBook,
  search,
} from "../controllers";

import errorWrapper from "../helpers/errorHandler/errorWrapper";
import { isAuth } from "../middleware";

const router = Router();
// Set up multer storage
const storage = multer.diskStorage({});
// Set up multer upload
const upload = multer({ storage });

router
  .route("/books/:userId")
  .get(errorWrapper(isAuth), errorWrapper(getAllBooks))
  .post(
    errorWrapper(isAuth),
    upload.single("image"),
    errorWrapper(createBook)
  );

router
  .route("/books/:userId/:bookId")
  .delete(errorWrapper(isAuth), errorWrapper(deleteBook))
  .put(
    errorWrapper(isAuth),
    upload.single("image"),
    errorWrapper(updateBook)
  );

// search router
router.get(
  "/books/search/:userId",
  errorWrapper(isAuth),
  errorWrapper(search)
);
export default router;
