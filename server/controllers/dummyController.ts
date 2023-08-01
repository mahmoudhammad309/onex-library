import { Response, Request } from "express";

export default class dummyController {
  // get All Contacts
  public static async index(req: Request, res: Response) {
    res.status(200).json({ status: 200, data: "dummy route is running right now :)" });
  }
}
