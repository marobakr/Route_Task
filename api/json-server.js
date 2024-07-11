const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("../db/db.json"); // Path to your db.json file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = (req, res) => {
  server(req, res);
};
