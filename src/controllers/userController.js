import {
  authCollection,
  sessionsCollection,
  statementCollection,
} from "../database/db.js";
import dayjs from "dayjs";

export async function getUserInfo(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const sessions = await sessionsCollection.findOne({ token });
  if (!sessions) {
    return res.sendStatus(401);
  }

  const user = await authCollection.findOne({ _id: sessions?.userId });
  delete user.password;

  const statement = await statementCollection
    .find({ userId: user._id })
    .toArray();
  if (!statement) {
    return res.status(400).send("Não ha nada aqui");
  }

  const body = { name: user.name, statement: [...statement] };

  res.send(body);
}

export async function newEntry(req, res) {
  const timeSent = `${dayjs(Date.now()).$D}/${dayjs(Date.now()).$M}`;
  const { authorization } = req.headers;
  const { value, description } = req.body;

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const sessions = await sessionsCollection.findOne({ token });
  if (!sessions) {
    return res.sendStatus(401);
  }

  const userId = sessions.userId;
  const body = { userId, value, description, type: "entry" };

  try {
    await statementCollection.insertOne(body);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function newWithdraw(req, res) {
  const timeSent = `${dayjs(Date.now()).$D}/${dayjs(Date.now()).$M}`;
  const { authorization } = req.headers;
  const { value, description } = req.body;

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const sessions = await sessionsCollection.findOne({ token });
  if (!sessions) {
    return res.sendStatus(401);
  }

  const userId = sessions.userId;
  const body = { userId, value, description, type: "withdraw" };

  try {
    await statementCollection.insertOne(body);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}
