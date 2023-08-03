import { Router } from "express";
import multer from "multer";

import { BooksController } from "../controllers";
import errorWrapper from "../helpers/errorHandler/errorWrapper";
import { isAuth } from "../middleware";

const router = Router();
// Set up multer storage
const storage = multer.diskStorage({});
// Set up multer upload
const upload = multer({ storage });

router
  .route("/books/:userId")
  .get(errorWrapper(isAuth), errorWrapper(BooksController.getAll))
  .post(
    errorWrapper(isAuth),
    upload.single("image"),
    errorWrapper(BooksController.create)
  );

router
  .route("/books/:userId/:bookId")
  .delete(errorWrapper(isAuth), errorWrapper(BooksController.delete))
  .put(
    errorWrapper(isAuth),
    upload.single("image"),
    errorWrapper(BooksController.update)
  );

// search router
router.get(
  "/books/search/:userId",
  errorWrapper(isAuth),
  errorWrapper(BooksController.search)
);
export default router;
