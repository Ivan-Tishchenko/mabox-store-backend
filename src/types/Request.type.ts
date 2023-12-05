import User from "./User.type";

import { Request } from "express";

interface RequestType extends Request {
  user: User;
  file?: Express.Multer.File;
}

export type { RequestType };
