import Joi from "joi";

export const extractSchema = Joi.object({
    event: Joi.string().required(),
    price: Joi.number().required(),
    type: Joi.string().required().valid("positive", "negative"),
  });
