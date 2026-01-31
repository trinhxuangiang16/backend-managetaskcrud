import cors from "cors";
import express from "express";
import { NotFountException } from "./src/common/helpers/exception.helper.js";
import { appError } from "./src/common/helpers/handle-error-helper.js";
import rootRouter from "./src/routers/root.router.js";

const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
  }),
);

app.use("/api", rootRouter);
app.use((req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;
  console.log(`${method} ${url} ${ip}`);

  throw new NotFountException();
});
app.use(appError);

const port = 3069;

app.listen(port, () => {
  console.log(port);
});
