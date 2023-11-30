import { Response, NextFunction } from "express";

import { User, loginJoiSchema } from "../models/user";

import { compareHashPassword } from "../helpers/comparePassword";

import { createJWT } from "./jwt";
import { RequestType } from "types/Request.type";

const loginUser = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = loginJoiSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
      return;
    }

    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(401).json({
        message: "Email or password is wrong",
      });
      return;
    }

    const isPasswordTrue = await compareHashPassword(
      req.body.password,
      user.password
    );

    if (!isPasswordTrue) {
      res.status(401).json({
        message: "Email or password is wrong",
      });
      return;
    }

    const token = createJWT({
      _id: `${user.id}`,
      email: user.email,
    });

    user.token = token;

    await User.findOneAndUpdate({ _id: user.id }, user);

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: req.body.email,
      phone: user.phone,
      birthday: user.birthday,
      telegram: user.telegram,
      avatarURL: user.avatarURL,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error login user", error);
    res.status(500).json({ message: "Error login user" });
  }
};

export default loginUser;
