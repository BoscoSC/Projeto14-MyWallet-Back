import express from "express";
import joi from "joi";
import { MongoClient, MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
dotenv.config();

const app = express();

const userSchema = joi.object({
  name: joi.string().required(),
});

const mongoClient = new MongoClient(precess.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("MongoDB conectado");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("myWallet");
const usersCollection = db.collection("users");
const sessionsCollection = db.collection("sessions");

app.post("/signUp", async (req, res) => {
  const user = req.body;
  const passwordHash = bcrypt.hashSync(user.password, 10);

  await db.collection("users").insertOne({ ...user, password: passwordHash });
  res.sendStatus(201);
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  const token = uuidV4();

  const user = await usersCollection.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    await sessionsCollection.insertOne({
      token,
      userId: user._id,
    });

    res.send({ token });
  } else {
    res.sendStatus(401);
  }
});

app.listen(5000, () => console.log("Port 5000"));
