import { Boom } from "@hapi/boom"
import { NextFunction, Request, Response } from "express"
import { MongooseError } from "mongoose"

function logError(err:Boom, req:Request, res:Response, next:NextFunction){
  console.error(err)

  next(err)
}
function errorHandler(err:Boom, req:Request, res:Response, next:NextFunction){
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}
function boomErrorHandler(err:Boom, req:Request, res:Response, next:NextFunction){
  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
    return;
  }
  next(err)
}
function ormErrorHandler(err:MongooseError, req:Request, res:Response, next:NextFunction){
  if(err instanceof MongooseError){
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.message
    })
  }
  next(err)
}
export {logError, errorHandler, boomErrorHandler, ormErrorHandler}
