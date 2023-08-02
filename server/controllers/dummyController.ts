import { Response, Request } from "express";
import {Book} from '../models'
export default class dummyController {
  
  public static async index(req: Request, res: Response) {
    const Books = await Book.findAll()
    res.status(200).json({ status: 200, data: Books });
  }
}
