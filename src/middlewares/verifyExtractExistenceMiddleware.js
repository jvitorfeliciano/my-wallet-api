import { ObjectID } from "bson";
import { extractsCollection } from "../database/db.js";

export default async function verifyExtractExistence(req, res, next){
    const id = req.params.extractId;
    try{
        const extract = await extractsCollection.findOne({_id:ObjectID(id)});
        if(!extract){
          return res.status(404).send({message:"Extrato não encontrado"});
        }
    }catch(err){
        return res.status(500).send({ message: "Erro do servidor" });
    }
  
    next();
}

