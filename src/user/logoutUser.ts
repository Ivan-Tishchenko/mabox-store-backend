import { User } from "../models/user";
import { Response, NextFunction } from "express";
import { RequestType } from "types/Request.type";

const logoutUser = async (
  req: RequestType,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id } = req.user;

    const user = await User.findOneAndUpdate(
      { _id: _id },
      { token: null },
      { new: true }
    );

    if (!user) {
      res.status(204);
    }

    res.status(201).json({
      id: user?.id,
      email: user?.email,
      name: user?.name,
      avatarUrl: user?.avatarURL,
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

export default logoutUser;
