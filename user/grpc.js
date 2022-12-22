const PROTO_PATH = __dirname + "/protos/user.proto";
const grpc = require("@grpc/grpc-js");
const server = new grpc.Server();

exports.startGrpcServer = function () {
  server.bindAsync(
    `0.0.0.0:${process.env.PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) console.error(error);
      else {
        server.start();
        console.log(`server running at 0.0.0.0:${port}`);
      }
    }
  );
};

exports.getGrpcServer = function () {
  return server;
};
