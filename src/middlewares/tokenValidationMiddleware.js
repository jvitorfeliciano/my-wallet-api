import { sessionsCollection, usersCollection } from "../database/db.js";

export default async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "Acesso negado" });
  }
  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    const user = await usersCollection.findOne({ _id: session.userId });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    req.userId = user._id;
  } catch (err) {
    return res.status(500).send({ message: "Erro do servidor" });
  }

  next();
}
