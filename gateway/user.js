const express = require("express");
const router = express.Router();

const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname + "/protos/user.proto";
const { requiresAuth } = require("./auth");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  defaults: true,
  oneofs: true,
});

const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;
const client = new UserService(
  "localhost:8081",
  grpc.credentials.createInsecure()
);


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(401)
      .json({ success: false, msg: "missing fields to register user" });

  const createUserRequest = {
    user: {
      name,
      email,
      password,
    },
  };
 
  client.createUser(createUserRequest, (err, msg) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: "user auth error" });
    } else {
      return res
        .status(200)
        .json({ success: true, msg: "user created", id: msg.id });
    }
  });
});

module.exports = router;
