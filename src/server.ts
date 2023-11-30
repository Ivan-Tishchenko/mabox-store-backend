import app from "./app";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

mongoose
  .connect(
    process.env.DB_HOST ||
      `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.57nxlhj.mongodb.net/`
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "Server running. Use our API on port: 3000"
      );
    });
    console.log("Database connection successful");
  })
  .catch((error: Error) => {
    console.log(error.message);
    process.exit(1);
  });
