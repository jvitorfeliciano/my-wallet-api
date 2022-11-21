import { signInSchema } from "../schemas/signInSchema.js";

export default function signInValidation(req, res, next) {
  const body = req.body;

  const { error } = signInSchema.validate(
    body,
    { abortEarly: false }
  );

  if (error) {
    return res.status(422).send({ message: "Preencha os campos corretamente" });
  }
  next();
}

