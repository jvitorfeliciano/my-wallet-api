import dayjs from "dayjs";
import { extractsCollection, sessionsCollection } from "../database/db.js";

export async function postExtract(req, res) {
  const extract = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const user = await sessionsCollection.findOne({ token });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const formattedExtract = {
      date: dayjs().format("DD/MM"),
      key: user.userId,
      ...extract,
    };
    await extractsCollection.insertOne(formattedExtract);
    return res.status(201).send({ message: "Extrato cadastrado com sucesso" });
  } catch (err) {
    return res.status(500).send({ error: "Erro do servidor" });
  }
}

export async function getExtract(req, res) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  try {
    const user = await sessionsCollection.findOne({ token });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    const userExtracts = await extractsCollection
      .find({ key: user.userId })
      .toArray();

    delete userExtracts.key;

    return res.send(userExtracts);
  } catch (err) {
    return res.status(500).send({ error: "Erro do servidor" });
  }
}
