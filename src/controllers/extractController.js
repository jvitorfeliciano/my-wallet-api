import { ObjectID } from "bson";
import dayjs from "dayjs";
import { extractsCollection } from "../database/db.js";

export async function postExtract(req, res) {
  const { event, price, type } = req.body;
  const userId = req.userId;

  try {
    const formattedExtract = {
      date: dayjs().format("DD/MM"),
      key: userId,
      event,
      type,
      price: Number(price),
    };

    await extractsCollection.insertOne(formattedExtract);

    return res.status(201).send({ message: "Extrato cadastrado com sucesso" });
  } catch (err) {
    return res.status(500).send({ message: "Erro do servidor" });
  }
}

export async function getExtract(req, res) {
  const userId = req.userId;

  function computeTotalBalance(arr) {
    const prices = arr.map((e) => {
      if (e.type === "positive") {
        return e.price;
      } else if (e.type === "negative") {
        return e.price * -1;
      }
    });
    const totalBalance = prices.reduce(
      (initialValue, element) => initialValue + element,
      0
    );
    return totalBalance;
  }

  try {
    const userExtracts = await extractsCollection
      .find({ key: userId })
      .toArray();

    const balance = computeTotalBalance(userExtracts);
    return res.status(200).send({ extracts: userExtracts, balance });
  } catch (err) {
    return res.status(500).send({ message: "Erro do servidor" });
  }
}

export async function deleteExtract(req, res) {
  const id = req.params.extractId;
  try {
    await extractsCollection.deleteOne({ _id: ObjectID(id) });
    return res.status(200).send({ message: "Extrato deletado com sucesso" });
  } catch (err) {
    return res.status(500).send({ message: "Erro do servidor" });
  }
}

export async function putExtract(req, res) {
  const { event, type, price } = req.body;
  const id = req.params.extractId;

  try {
    await extractsCollection.updateOne(
      { _id: ObjectID(id) },
      { $set: { event, type, price: Number(price) } }
    );
    return res.status(200).send({ message: "Extrato atualizado com sucesso" });
  } catch (err) {
    return res.status(500).send({ message: "Erro do servidor" });
  }
}
