import express from "express";
import joi from "joi";
import { MongoClient, MongoClient } from "mongodb";
import dotenv from "dotenv";
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

app.post("/", async (req, res) => {});

app.listen(5000, () => console.log("Port 5000"));
