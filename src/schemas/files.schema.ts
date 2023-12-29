import Joi from "joi";

const name = Joi.string().min(3).max(60);

const updateFile = Joi.object({
  name: name.required()
})

export {updateFile}