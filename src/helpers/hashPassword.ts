import bcrypt from "bcrypt";

const createHashPassword = async (
  password: string
): Promise<string> => {
  const hashPassword: string = await bcrypt.hash(
    password,
    10
  );
  return hashPassword;
};

export { createHashPassword };
