const express = require("express");
const websocket = require("./websocket/index.js");

require("dotenv").config();

// создаем приложение экпресс
const app = express();
app.use(express.json());
const port = process.env.PORT;

// запускаем сервер на порту
const server = app.listen(port, () => {
  console.log(`server has been started on ${port} port`);
});

// интегрируем вебсокеты внуть сервера
websocket(server, app);