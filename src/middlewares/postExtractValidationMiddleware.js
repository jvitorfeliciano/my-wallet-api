import { extractSchema } from "../schemas/schemas.js";

export default function postExtractValidation(req, res, next) {
  const extract = req.body;
  const { error } = extractSchema.validate(extract, { abortEarly: false });

  if (error) {
    return res.status(422).send({ message: "Preencha os campos corretamente" });
  }
  next();
}


