import { User, joiUserSchema } from "../models/user";

import { createHashPassword } from "../helpers/hashPassword";

import gravatar from "gravatar";

import { createJWT } from "./jwt";
import { RequestType } from "types/Request.type";
import { Response, NextFunction } from "express";
import TypeUser from "types/User.type";

type UserData = {
  name: string;
  email: string;
  password: string | void;
  avatarURL: string;
  token: null;
  createdAt: string;
  updatedAt: string;
};

const setUser = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const password = await createHashPassword(
      req.body.password
    )
      .then((data) => data)
      .catch((error) => console.log(error.message));

    const avatarURL = gravatar.url(req.body.email);

    const currentDate: Date = new Date();
    const formattedDate = currentDate.toISOString();

    const userData: UserData = {
      name: req.body.name,
      email: req.body.email,
      password: password,
      avatarURL,
      token: null,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };

    const { _id } = await User.create(userData);

    const token = createJWT({
      _id,
      email: req.body.email,
    });

    const user = await User.findOneAndUpdate(
      { _id },
      { token }
    );

    const resUser: TypeUser = {
      _id: user?.id,
      name: req?.body?.name,
      email: req?.body?.email,
      phone: user?.phone || "",
      birthday: user?.birthday || "",
      telegram: user?.telegram || "",
      avatarURL,
      token,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };

    res.status(201).json(resUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

export default setUser;
