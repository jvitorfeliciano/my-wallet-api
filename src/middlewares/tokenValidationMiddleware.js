export default function tokenValidation(req,res,next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ message: "Acesso negado" });
  }
  next();
}
