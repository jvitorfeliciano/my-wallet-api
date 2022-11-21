import { usersCollection } from "../database/db.js";
import { signUpSchema } from "../schemas/signUpSchema.js";

export default async function signUpValidation(req, res, next) {
  const body = req.body;

  const { error } = signUpSchema.validate(
    body,
    { abortEarly: false }
  );

  if (error) {
    return res.status(422).send({ message: "Preencha os campos corretamente" });
  }
  next();
}
