import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { usersCollection,sessionsCollection } from "../index.js";
import { signinSchema, signupSchema } from "../schemas/schemas.js";

export async function postSignUp(req, res){
    const { name, email, password } = req.body;
  
    const { error } = signupSchema.validate(
      { name, email, password },
      { abortEarly: false }
    );
  
    if (error) {
        return res.status(422).send({ message: "Preencha os campos corretamente" })
    }
  
    try {
      const users = await usersCollection.findOne({ email });
  
      if (users) {
        return res.status(409).send({ message: "Usuário já cadastrado" });
      }
  
      const encryptedPassword = bcrypt.hashSync(password, 10);
      await usersCollection.insertOne({
        name,
        email,
        password: encryptedPassword,
      });
  
      return res.status(201).send({ message: "Usuário cadastrado om sucesso" });
    } catch (err) {
      return res.status(500).send({ error: "Erro do servidor" });
    }
  }

  export async function postSignIn(req, res){
    const { email, password } = req.body;
  
    const { error } = signinSchema.validate(
      { email, password },
      { abortEarly: false }
    );
  
    if (error) {
      return res.status(422).send({ message: "Preencha os campos corretamente" });
    }
  
    try {
      const user = await usersCollection.findOne({ email });
  
      if (user && bcrypt.compareSync(password, user.password)) {
        const isThereToken = await sessionsCollection.findOne({
          userId: user._id,
        });
        if (isThereToken) {
          await sessionsCollection.deleteOne({ userId: user._id });
          console.log("ele tinha token")
        }
       
        const token = uuidv4();
        await sessionsCollection.insertOne({ token, userId: user._id });
        return res.status(200).send({ token: token, name: user.name });
      } else {
        return res.status(401).send({ message: "Email ou senha incorretos" });
      }
    } catch (err) {
      return res.status(500).send({ error: "Erro do servidor" });
    }
  }