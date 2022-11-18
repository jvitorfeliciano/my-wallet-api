import { signinSchema } from "../schemas/schemas.js";

export default function signInRequesteValidation(req, res, next) {
  const { email, password } = req.body;

  const { error } = signinSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    return res.status(422).send({ message: "Preencha os campos corretamente" });
  }
  next();
}
