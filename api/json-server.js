const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db/db.json");
const middlewares = jsonServer.defaults();

// Error logging middleware
server.use((req, res, next) => {
  res.on("finish", () => {
    if (res.statusCode >= 400) {
      console.error(`Error ${res.statusCode}: ${req.method} ${req.url}`);
    }
  });
  next();
});

server.use(middlewares);
server.use(router);
server.listen(process.env.PORT || 3000, () => {
  console.log("JSON Server is running");
});
