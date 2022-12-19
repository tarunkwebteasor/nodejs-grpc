const express = require("express");
require('dotenv').config();
const app = express();
const userRouter = require("./user");


// app.use(requiresAuth);
app.use(express.json());

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server at ${process.env.PORT}`);
});
