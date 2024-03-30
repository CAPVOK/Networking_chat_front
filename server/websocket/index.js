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
  websocketServer.on(
    "connection",
    function connection(websocketConnection, connectionRequest) {
      console.log("Connection on!");

      // получаем параметры запроса
      const [_path, params] = connectionRequest?.url?.split("?");
      const connectionParams = queryString.parse(params);

      console.log("connectionParams", connectionParams);

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

      app.post(`/api/send-message`, (req, res) => {
        try {
          const message = req.body;
          console.log("message from back", message);
          sendMessageToClient(message)
          // Обрабатываем сообщение, как вам нужно
          res.status(200).json({ success: true, message: "Message received." });
        } catch (error) {
          console.error("Error processing message:", error);
          res.status(500).json({ success: false, message: "Internal server error." });
        }
      });

      //после подключения отправляем юзеру приветсвенное сообщение (тестовый запрос)
      /*  websocketConnection.send(
        JSON.stringify({ message: "hello, my friend, how are you?" })
      ); */

      websocketConnection.on("message", async (messageData) => {
        try {
          console.log(messageData);
          websocketConnection.send(
            JSON.stringify({ message: "hello, my friend, how are you?", timestamp: (new Date()).toISOString(), sender: "Sam" })
          );
          /* await axios.post(
            `http://localhost:${process.env.SERVER_PORT}/api/send-message`,
            messageData,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ); */
        } catch (error) {
          console.error("Error sending message to other backend:", error);
        }
      });
    }
  );

  return websocketServer;
}

module.exports = websocket;
