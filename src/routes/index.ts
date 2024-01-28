import express, { Express } from "express";

import pictureRouter from '../routes/picture'
import fileRouter from '../routes/files'
import userRouter from '../routes/user'
import config from "../config";

export default function routerApi(app: Express) {
  const router = express.Router();
  app.use(`/${config.project}/${config.version}`, router);
  router.use("/pictures", pictureRouter);
  router.use("/files", fileRouter);
  router.use('/profiles', userRouter)
}
