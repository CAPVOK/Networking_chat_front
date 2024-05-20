const WebSocket = require("ws");
const axios = require("axios");

async function websocket(expressServer, app) {
  // Создаем сервер WebSocket
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });

  // Обрабатываем обновление HTTP сервера
  expressServer.on("upgrade", (request, socket, head) => {
    // Перенаправляем обновление на сервер WebSocket для обработки
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      // Вызываем событие подключения
      websocketServer.emit("connection", websocket, request);
    });
  });

  // Обрабатываем соединение по WebSocket
  websocketServer.on("connection", function connection(websocketConnection) {
    console.log("WebSocket Connection Established!");
    
    // Обрабатываем сообщение от клиента через WebSocket
    websocketConnection.on("message", async (messageData) => {
      try {
        console.log("New message from client:", JSON.parse(messageData.toString("utf8")));
        // Пересылаем сообщение на HTTP POST эндпоинт
        await axios.post(
          `http://${process.env.SERVER_URL || '192.168.0.84:8082'}/api/send-message`,
          messageData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error sending message to other backend:", error);
      }
    });
  });

  // Обрабатываем HTTP POST запрос на эндпоинт '/api/send-message'
  app.post(`/api/send-message`, (req, res) => {
    try {
      const message = req.body;
      console.log("Message from back:", message);
      // Отправляем сообщение клиенту через WebSocket
      websocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
      res.status(200).json({ message: "Message received." });
    } catch (error) {
      console.error("Error processing message:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  });

  return websocketServer;
}

module.exports = websocket;
