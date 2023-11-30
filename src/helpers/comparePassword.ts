import bcrypt from "bcrypt";

const compareHashPassword = async (
  password,
  hashPassword
) => {
  const comparePassword = await bcrypt.compare(
    password,
    hashPassword
  );
  return comparePassword;
};

export { compareHashPassword };
