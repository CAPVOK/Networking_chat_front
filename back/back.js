const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.listen("8082", console.log(`server has been started on 8082 port`));

app.post("/api/send-message", (req, res) => {
  console.log("message from server", req.body);
  res.json({ message: "hi from back" });

  axios.post(
    `http://localhost:5001/api/send-message`,
    { message: "урааааа" },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});
