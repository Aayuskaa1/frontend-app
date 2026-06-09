import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.route";
import { HttpException } from "./exceptions/http-exception";
import { ApiResponseHelper } from "./utils/apihelper.util";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json(ApiResponseHelper.error("Route not found", 404));
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpException) {
    res
      .status(err.status)
      .json(ApiResponseHelper.error(err.message, err.status));
    return;
  }

  console.error(err);
  res.status(500).json(ApiResponseHelper.error("Internal server error", 500));
});

export default app;
