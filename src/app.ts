import express, {
  Request,
  Response,
  NextFunction,
} from "express";
import logger from "morgan";
import cors from "cors";

require("dotenv").config();

import authRouter from "./routes/api/auth";
// import reviewsRouter from "./routes/api/reviews";
import userRouter from "./routes/api/users";

const app = express();

const formatsLogger =
  app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
// app.use("/api/reviews", reviewsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

export default app;
