import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/http";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res, next) => {
  return res.status(OK).json({
    status: "healthy",
  });
});

app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
