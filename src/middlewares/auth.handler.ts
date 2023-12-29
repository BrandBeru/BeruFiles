import { NextFunction } from "express";
import config from "../config";
import boom from "@hapi/boom";

function checkApiKey(req: Request, res: Response, next: NextFunction){
  const apiKey = req.headers['api'];
  if(apiKey === config.api_key){
    next();
    return;
  } else {
    throw boom.unauthorized()
  }
}
export {checkApiKey};