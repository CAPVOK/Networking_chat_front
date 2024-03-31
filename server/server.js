const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const websocket = require("./websocket/index.js");

require("dotenv").config();

// создаем приложение экпресс
const app = express();

const swaggerDocument = YAML.load("./swagger.yaml");
const port = process.env.PORT;

app.use(express.json());
// Настройка маршрута для Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


// запускаем сервер на порту
const server = app.listen(port, () => {
  console.log(`server has been started on ${port} port`);
});

// интегрируем вебсокеты внуть сервера
websocket(server, app);
