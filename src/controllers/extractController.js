import { ObjectID } from "bson";
import dayjs from "dayjs";
import { extractsCollection } from "../database/db.js";

export async function postExtract(req, res) {
  const extract = req.body;
  const userId = req.userId;

  try {
    const formattedExtract = {
      date: dayjs().format("DD/MM"),
      key: userId,
      ...extract,
    };
    await extractsCollection.insertOne(formattedExtract);

    return res.status(201).send({ message: "Extrato cadastrado com sucesso" });
  } catch (err) {
    return res.status(500).send({ error: "Erro do servidor" });
  }
}

export async function getExtract(req, res) {
  const userId = req.userId;

  try {
    const userExtracts = await extractsCollection
      .find({ key: userId })
      .toArray();
    return res.send(userExtracts);
  } catch (err) {
    return res.status(500).send({ error: "Erro do servidor" });
  }
}

export  async function deleteExtract(req, res) {
  const id = req.params.extractId;
  try {
    await extractsCollection.deleteOne({ _id: ObjectID(id) });
    return res.status(200).send({ message: "Extrato deletado com sucesso" });
  } catch (err) {
    return res.status(500).send({ error: "Erro do servidor" });
  }
}

