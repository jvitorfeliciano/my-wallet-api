import { signupSchema } from "../schemas/schemas.js";

export default function signUpRequestValidation(req, res, next) {
  const { name, email, password } = req.body;

  const { error } = signupSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );

  if (error) {
    return res.status(422).send({ message: "Preencha os campos corretamente" });
  }

  next();
}
