import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const createJWT = (payload: {
  _id: Types.ObjectId | string;
  email: string;
}): string => {
  const secretWord = process.env.SECRET_WORD;
  const token = jwt.sign(payload, secretWord || "");
  return token;
};

const verificationJWT = (token: string) => {
  try {
    const isJwtTrue = jwt.verify(
      token,
      process.env.SECRET_WORD || ""
    );
    return isJwtTrue;
  } catch (error) {
    console.error("Error creating user", error);
  }
};

const decodeJwt = (token: string): any => {
  return jwt.decode(token);
};

export { createJWT, verificationJWT, decodeJwt };
