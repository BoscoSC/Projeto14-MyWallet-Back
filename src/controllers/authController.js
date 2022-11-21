import { authCollection, sessionsCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function SignUp(req, res) {
  const user = req.body;
  const passwordHash = bcrypt.hashSync(user.password, 10);

  await authCollection.insertOne({ ...user, password: passwordHash });
  res.sendStatus(201);
}

export async function SignIn(req, res) {
  const { email, password } = req.body;
  const token = uuidV4();

  const user = await authCollection.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    await sessionsCollection.insertOne({
      token,
      userId: user._id,
    });

    res.send({ token });
  } else {
    res.sendStatus(401);
  }
}
