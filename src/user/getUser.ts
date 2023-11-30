import User from "types/User.type";
import { Response, NextFunction } from "express";
import { RequestType } from "types/Request.type";

const getUser = async (
  req: RequestType,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      email,
      name,
      avatarURL,
      phone,
      birthday,
      createdAt,
      updatedAt,
      telegram,
      token,
      _id,
    } = req.user;
    res.json({
      name,
      email,
      avatarURL,
      phone,
      birthday,
      createdAt,
      updatedAt,
      telegram,
      token,
      _id,
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

export default getUser;
