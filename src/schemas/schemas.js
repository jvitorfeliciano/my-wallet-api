
import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  
  export const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  
  export const extractSchema = Joi.object({
    event: Joi.string().required(),
    price: Joi.number().required(),
    type: Joi.string().required().valid("positive", "negative"),
  });
