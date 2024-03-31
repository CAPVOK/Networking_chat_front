const WebSocket = require("ws");
const queryString = require("query-string");
const axios = require("axios");

async function websocket(expressServer, app) {
  //создаем сервер websocket
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });

  // ловим обновление http сервера
  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      //вызываем подключение
      websocketServer.emit("connection", websocket, request);
    });
  });

  // создаем подключение по websocket
  websocketServer.on("connection", function connection(websocketConnection) {
    console.log("Connection on!");

    function sendMessageToClient(message) {
      // Проверяем, что WebSocket подключение установлено
      if (
        websocketConnection &&
        websocketConnection.readyState === WebSocket.OPEN
      ) {
        // Отправляем сообщение клиенту
        const stringMessage = JSON.stringify(message);
        websocketConnection.send(stringMessage);
      } else {
        console.error("WebSocket connection is not established or closed.");
      }
    }

    /*  app.post(`/api/send-message`, (req, res) => {
        try {
          const message = req.body;
          console.log("message from back", message);
          sendMessageToClient(message);
          // Обрабатываем сообщение, как вам нужно
          res.status(200).json({ success: true, message: "Message received." });
        } catch (error) {
          console.error("Error processing message:", error);
          res
            .status(500)
            .json({ success: false, message: "Internal server error." });
        }
      }); */

    websocketConnection.on("message", async (messageData) => {
      try {
        console.log("new message from client", messageData);
        await axios.post(
          `http://localhost:${process.env.SERVER_PORT}/api/send-message`,
          messageData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        /* .then((data) => console.log("response", data.data)); */
      } catch (error) {
        console.error("Error sending message to other backend:", error);
      }
    });
  });

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
      res.status(200).json({ success: true, message: "Message received." });
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
