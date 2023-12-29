import express, { Express } from "express";

import filesRouter from '../routes/files'
import config from "../config";

export default function routerApi(app: Express) {
  const router = express.Router();
  app.use(`/${config.project}/${config.version}`, router);
  router.use("/files", filesRouter);
}
