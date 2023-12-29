import boom from "@hapi/boom";

function validatorHandler(schema:any, property:any){
  return(req:any,res:any, next:any) =>{
    const data = req[property]
    const {error} = schema.validate(data, {abortEarly:false})
    if(error){
      next(boom.badRequest(error))
      return;
    }
    next()
  }
}
export default validatorHandler
