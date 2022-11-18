import { sessionsCollection, extractsCollection } from "../index.js";
import { extractSchema } from "../schemas/schemas.js";
import dayjs from "dayjs";

export async function postExtract(req, res){
  const extract = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ message: "Acesso negado" });
  }

  const { error } = extractSchema.validate(extract, { abortEarly: false });

  if (error) {
    return res.status(422).send({ message: "Preencha os campos corretamente" });
  }

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

  if (!token) {
    console.log(token);
    return res.status(401).send({ message: "Acesso negado" });
  }
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
