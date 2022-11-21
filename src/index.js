import express from "express";

import authRouters from "./routes/authRoute.js";
import userRouters from "./routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(authRouters);
app.use(userRouters);

app.listen(5000, () => console.log("Port 5000"));
