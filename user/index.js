const { startGrpcServer, getGrpcServer } = require("./grpc");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
require('dotenv').config();
const PROTO_PATH = __dirname + "/protos/user.proto";
const { createUser, getUser } = require("./user");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  defaults: true,
  oneofs: true,
});

const user_proto = grpc.loadPackageDefinition(packageDefinition);

startGrpcServer();
const server = getGrpcServer();

server.addService(user_proto.UserService.service, {
  createUser,
  getUser
});
